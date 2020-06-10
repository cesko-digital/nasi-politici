### AWS infrastruktura pro Nase Politiky

#### Struktura:

- Pro spravu infrastruktury se pouziva Terraform
- Backend (.net core) se deployuje na ECS
- Backend (Python) se deployuje na AWS Lambda
- Frontend a staticke assety se deployuji na S3
- Pro cache se pouziva CloudFront, ktery propojuje API se statickym obsahem
- Vse se Terraformuje a deplyuje automaticky pri push do master branch.

### Instalace na cisty AWS ucet

- Vse se odehrava ve vami zvolenem regionu, v puvodnim repozitari se 
pouziva "eu-west-1" jako priklad.

#### Priprava:

1. Vytvorte *private* S3 Bucket pro Terraform Backend (v prikladu: "nasi-politici-terraform-backend")

2. Vytvorte Secrets s nazvem "nasipoliticiSecrets" v AWS SecretsManager 
a ulozte tam vsechny API klice a dalsi nastaveni. Struktura viz nize.
    ```json
    {
      "MediaApiUrl": "",
      "MediaToken": "",
      "MediaUrl": "",
      "HlidacAuthenticationToken": "",
      "CzFinToken": "",
      "MailAuthenticationToken": "",
      "MailConfiguration__ApiKey": "",
      "MailConfiguration__From": "",
      "MailConfiguration__Tos": ""
    }
    ```
3. V zone "eu-east-1" (N. Virginia) vytvorte certifikat pro public domenu, na
ktere vse pobezi. ([info](https://aws.amazon.com/blogs/security/easier-certificate-validation-using-dns-with-aws-certificate-manager/))
4. Do souboru /infrastructure/aws/aws.tf doplnte promenne (aws_region, bucket z (1), certifikat arn z (3),
public a internal domain name ...). Vsechny promenne jsou na zacatku souboru.

#### Terraformovani

1. Nainstalujte [Terraform](https://terraform.io)
2. `terraform init`
3. `terraform apply`

Pokud vse probehne bez chyb meli byste mit kompletne nastavene AWS prostredi.

#### DNS

- Pokud hostujete domenu na AWS, vse se nastavilo automaticky

- Pokud mate domenu mimo AWS je potreba nastavit CNAME nasipolitici.{vase_domena} na 
URL CloudFront distribuce.

#### Deployment

- Doporucuju pouzivat pro deployment GitHub actions (viz .github/workflows)

1. Nastavte AWS klice do Github Secrets (AWS_ACCESS_KEY_ID a AWS_SECRET_ACCESS_KEY)
2. Nastavte parametry pro deployment do Github Secrets.
    ```text
   AWS_CLOUDFRONT_DEPLOYMENT_ID (ID CloudFront distribuce, kde bezi FE)
   AWS_FRONTEND_BUCKET_NAME (S3 Bucket, kam se uploaduje FE)
   AWS_REGION (Vami zvoleny region)
   AWS_REPOSITORY (Docker repozitory hostovana na ECS)
   REACT_APP_BASE_API_URL (API URL pro FE) 
    ```
   Priklad:
   ```text
    AWS_CLOUDFRONT_DEPLOYMENT_ID = E272UJVD1FXLKI
    AWS_FRONTEND_BUCKET_NAME = nasi-politici-frontend
    AWS_REGION = eu-west-1
    AWS_REPOSITORY = 313370994665.dkr.ecr.eu-west-1.amazonaws.com
    REACT_APP_BASE_API_URL = https://nasipolitici.ceskodigital.net 
   ```
3. Jakakoli zmena v podadresari automaticky deployne prislusny projekt.