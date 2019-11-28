import React from 'react';
import styled from 'styled-components';
import { Card, Chip } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FlagOutlined from '@material-ui/icons/FlagOutlined';
import Link from '@material-ui/icons/Link';

interface DetailCardProps {
    title: string,
    tag: string,
    link: string,
    content: any,
}

const TitleElement = styled.span`
    font-weight: 700;
`;

const CardHeaderElement = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
`;

const CircleChipElement = styled(Chip)`
    margin-left: 6px !important;

    .MuiChip-label {
        padding-right: 0;
    }
`;

const DetailCard = ({ title, tag, link, content }: DetailCardProps) => {
  return (
    <Card>
      <CardHeaderElement>
        <TitleElement>{title}</TitleElement>
        <div>
            <Chip
                icon={<Link />}
                label={tag}
                clickable
                onClick={()=> window.open(link, "_blank")}
            />
            {// ts-ignore
                <CircleChipElement icon={<FlagOutlined />} clickable />
            }
        </div>
      </CardHeaderElement>
      <CardContent>
          {content}
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
        <CardContent>
            <Typography paragraph>Method:</Typography>
        </CardContent>
    </Card>
  );
}

export default DetailCard;
