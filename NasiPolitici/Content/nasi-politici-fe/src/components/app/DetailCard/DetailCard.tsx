import React from 'react';
import styled from 'styled-components';
import { Card, Chip } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import FlagOutlined from '@material-ui/icons/FlagOutlined';
import Link from '@material-ui/icons/Link';

interface DetailCardProps {
    title: string,
    tag: string,
    link: string,
    content: any,
    footer?: any,
}

const TitleElement = styled.span`
    font-weight: 600;
`;

const CardHeaderElement = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 16px 32px;
`;

const CircleChipElement = styled(Chip)`
    margin-left: 6px !important;

    .MuiChip-label {
        padding-right: 0;
    }
`;

const DetailCard = ({ title, tag, link, content, footer }: DetailCardProps) => {
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
      {footer && footer}
    </Card>
  );
}

export default DetailCard;
