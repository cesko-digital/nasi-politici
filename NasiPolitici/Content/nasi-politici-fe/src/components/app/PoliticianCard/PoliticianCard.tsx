import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, Typography, Link } from '@material-ui/core';
import PoliticianTitle from './PoliticianTitle';

const PoliticianCard: React.FC = () => {

  return (
    <Card>

      <CardHeader
        avatar={
          <Avatar>
            R
          </Avatar>
        }
        title={<PoliticianTitle />}
        subheader="*1960 - TOP09"
      />
      <Link>show profile</Link>
      {/* <CardContent>
      </CardContent> */}
    </Card>
  );
}


export default PoliticianCard