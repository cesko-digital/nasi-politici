terraform {
  required_version = ">= 0.12.25"

  required_providers {
    aws = ">= 2.61.0"
  }

  backend "s3" {
    bucket = "nasi-politici-terraform-backend"
    key = "terraform.tfstate"
    region = "eu-west-1"
  }
}

variable "aws_region" {
  type = string
  default = "eu-west-1"
}

variable "codename" {
  type = string
  default = "nasipolitici"
}

# Internal domain, its not visible publicly, but it should be domain we own
# to comply with best practices => it ensures the internal domain names are globally unique.
variable "codename-domain" {
  type = string
  default = "ceskodigital.net"
}

variable "public-domain" {
  type = string
  default = "ceskodigital.net"
}

variable "domain-certificate-arn" {
  type = string
  default = "arn:aws:acm:us-east-1:313370994665:certificate/92346f6e-1016-4471-834a-a9c12ab70663"
}

provider "aws" {
  version = "~> 2.0"
  region = var.aws_region
}

data "aws_route53_zone" "public" {
  name = "${var.public-domain}."
}

# ----------------
# VPC Section
# ----------------

resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Name = var.codename
  }
}

resource "aws_subnet" "private" {
  cidr_block = "10.0.0.0/20"
  vpc_id = aws_vpc.vpc.id
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "${var.codename}-private"
  }
}

resource "aws_subnet" "public" {
  cidr_block = "10.0.16.0/20"
  vpc_id = aws_vpc.vpc.id
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "${var.codename}-public"
  }
}

resource "aws_internet_gateway" "internet-gateway" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "${var.codename}-internet-gateway"
  }
}

resource "aws_eip" "nat-gateway-ip" {
  vpc = true
}

resource "aws_nat_gateway" "nat-gateway" {
  subnet_id = aws_subnet.public.id
  allocation_id = aws_eip.nat-gateway-ip.id
}

# Routing table settings, we have 2 routing tables
# 1. public -> have access directly to internet gateway
# 2. private -> is routed to internet via NAT Gateway
#
# There is default table (set as main) without access to internet, only for local routes. Which is good default.
resource "aws_route_table" "public-routes" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet-gateway.id
  }

  tags = {
    Name = "${var.codename}-public-routes"
  }
}

resource "aws_route_table" "private-routes" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat-gateway.id
  }

  tags = {
    Name = "${var.codename}-private-routes"
  }
}

resource "aws_route_table_association" "private-subnet" {
  route_table_id = aws_route_table.private-routes.id
  subnet_id = aws_subnet.private.id
}

resource "aws_route_table_association" "public-subnet" {
  route_table_id = aws_route_table.public-routes.id
  subnet_id = aws_subnet.public.id
}

# -----------
# Security Groups
# -----------

resource "aws_security_group" "default-private-sg" {
  name = "${var.codename}-private-sg"
  description = "Default private security group"
  vpc_id = aws_vpc.vpc.id
}

resource "aws_security_group_rule" "default-private-rule" {
  from_port = 0
  protocol = "All"
  security_group_id = aws_security_group.default-private-sg.id
  to_port = 65535
  type = "ingress"
  cidr_blocks = [
    "10.0.0.0/16"
  ]
}

resource "aws_security_group_rule" "outbound-private-rule" {
  from_port = 0
  protocol = "All"
  security_group_id = aws_security_group.default-private-sg.id
  to_port = 65535
  type = "egress"
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

# --------
# Route53 Internal Zone
# --------

resource "aws_route53_zone" "private" {
  name = "internal.${var.codename-domain}"

  vpc {
    vpc_id = aws_vpc.vpc.id
  }
}

# ----------
# ECS deployment to Fargate
# ----------

resource "aws_ecr_repository" "nasi-politici" {
  name = "nasi-politici"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecs_cluster" "nasi-politici" {
  name = "nasi-politici"
}

resource "aws_ecs_task_definition" "nasi-politici" {
  family = "nasi-politici"
  container_definitions = templatefile("ecs/nasi-politici.tmpl", {
    aws_region = var.aws_region,
    aws_repository = aws_ecr_repository.nasi-politici.repository_url
  })
  network_mode = "awsvpc"
  execution_role_arn = aws_iam_role.ecr-task-execution-role.arn
  task_role_arn = aws_iam_role.ecr-task-execution-role.arn
  memory = "1024"
  cpu = "512"
}

resource "aws_ecs_service" "nasi-politici" {
  name = "nasi-politici"
  cluster = aws_ecs_cluster.nasi-politici.id
  task_definition = aws_ecs_task_definition.nasi-politici.arn
  launch_type = "FARGATE"
  desired_count = 1
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200
  health_check_grace_period_seconds = 20

  network_configuration {
    subnets = [
      aws_subnet.private.id
    ]
    security_groups = [
      aws_security_group.default-private-sg.id
    ]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.nasi-politici-tg.arn
    container_name = "nasi-politici"
    container_port = 5001
  }

  # Ignore external changes to desired count in Terraform, allows to switch to autoscaling group
  lifecycle {
    ignore_changes = [
      #      desired_count
    ]
  }
}

resource "aws_cloudwatch_log_group" "nasi-plitici-lg" {
  name = "/ecs/nasi-politici"
}

# -----------
# Elastic Load balancers
# -----------
resource "aws_lb" "nasi-politici-elb" {
  name = "nasi-politici-elb"
  internal = true
  load_balancer_type = "network"
  subnets = [
    aws_subnet.private.id
  ]

  idle_timeout = 400

  tags = {
    Name = "nasi-politici-elb"
  }
}

resource "aws_lb_listener" "nasi-politici-elb-listener" {
  load_balancer_arn = aws_lb.nasi-politici-elb.arn
  port = "80"
  protocol = "TCP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.nasi-politici-tg.arn
  }
}

resource "aws_lb_target_group" "nasi-politici-tg" {
  name = "nasi-politici-tg"
  port = 5001
  protocol = "TCP"
  vpc_id = aws_vpc.vpc.id
  target_type = "ip"

  stickiness {
    enabled = false
    type = "lb_cookie"
  }
}

resource "aws_route53_record" "nasi-politici-elb" {
  zone_id = aws_route53_zone.private.id
  name = "nasi-politici"
  type = "A"

  alias {
    name = aws_lb.nasi-politici-elb.dns_name
    zone_id = aws_lb.nasi-politici-elb.zone_id
    evaluate_target_health = false
  }
}

# -------------
# IAM roles
# -------------

resource "aws_iam_role" "ecr-task-execution-role" {
  name = "ecr-task-execution-role"

  assume_role_policy = file("roles/ecs-assume.json")
}

resource "aws_iam_role_policy_attachment" "ecr-task-execution-policy-attachment" {
  role = aws_iam_role.ecr-task-execution-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ------------
# API gateway
# ------------

resource "aws_api_gateway_vpc_link" "nasi-politici-link" {
  name = "nasi-politici-link"
  target_arns = [
    aws_lb.nasi-politici-elb.arn]
}

resource "aws_api_gateway_rest_api" "gateway-api" {
  name = "${var.codename}-api"
  endpoint_configuration {
    types = [
      "REGIONAL"
    ]
  }
}

resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  parent_id = aws_api_gateway_rest_api.gateway-api.root_resource_id
  path_part = "api"
}

resource "aws_api_gateway_resource" "v1" {
  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  parent_id = aws_api_gateway_resource.api.id
  path_part = "v1"
}

resource "aws_api_gateway_resource" "nasi-politici-proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  parent_id = aws_api_gateway_resource.v1.id
  path_part = "{proxy+}"
}

resource "aws_api_gateway_method" "nasi-politici-proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  resource_id = aws_api_gateway_resource.nasi-politici-proxy.id
  http_method = "ANY"
  authorization = "NONE"
  request_parameters = {
    "method.request.path.proxy" = true
  }
}

resource "aws_api_gateway_integration" "nasi-politici-proxy" {
  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  resource_id = aws_api_gateway_resource.nasi-politici-proxy.id
  http_method = aws_api_gateway_method.nasi-politici-proxy.http_method

  type = "HTTP_PROXY"
  uri = "http://${aws_lb.nasi-politici-elb.dns_name}/api/v1/{proxy}"
  integration_http_method = aws_api_gateway_method.nasi-politici-proxy.http_method

  request_parameters = {
    "integration.request.path.proxy" = "method.request.path.proxy"
  }

  connection_type = "VPC_LINK"
  connection_id = aws_api_gateway_vpc_link.nasi-politici-link.id
}

resource "aws_api_gateway_deployment" "api" {
  depends_on = [
    aws_api_gateway_integration.nasi-politici-proxy
  ]

  rest_api_id = aws_api_gateway_rest_api.gateway-api.id
  stage_name = "prod"
}

resource "aws_s3_bucket" "frontend" {
  bucket = "nasi-politici-frontend"
  acl = "private"

  policy = templatefile("roles/s3-cloudfront-policy.tmpl", {
    cloudfront_arn = aws_cloudfront_origin_access_identity.default.iam_arn,
    bucket_name = "nasi-politici-frontend"
  })
}

resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "Cloudfront Orgin Identity"
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id = "S3-${aws_s3_bucket.frontend.id}"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = replace(aws_api_gateway_deployment.api.invoke_url, "/^https?://([^/]*).*/", "$1")
    origin_id = aws_api_gateway_deployment.api.id
    origin_path = "/prod"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2"]
    }
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"

  aliases = [
    "nasipolitici.${var.public-domain}"
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    min_ttl = 0
    default_ttl = 0
    max_ttl = 0
    compress = true
    viewer_protocol_policy = "redirect-to-https"
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern = "/api/v1/*"
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
      "PUT",
      "POST",
      "PATCH",
      "DELETE"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = aws_api_gateway_deployment.api.id

    forwarded_values {
      query_string = true
      headers = [
        "Authorization",
        "Content-Type",
        "X-ApplicationId"]
      cookies {
        forward = "all"
      }
    }
    min_ttl = 0
    default_ttl = 0
    max_ttl = 0
    compress = true
    smooth_streaming = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.domain-certificate-arn
    cloudfront_default_certificate = false
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }
}

resource "aws_route53_record" "nasipolitici" {
  name = "nasipolitici"
  type = "CNAME"
  zone_id = data.aws_route53_zone.public.id
  records = [
    aws_cloudfront_distribution.distribution.domain_name
  ]
  ttl = "300"
}



