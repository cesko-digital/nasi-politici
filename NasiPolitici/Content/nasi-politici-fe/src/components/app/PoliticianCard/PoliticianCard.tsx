import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PoliticianDetails from './PoliticianDetails';
import { Grid, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';

interface PoliticianCardProps {
  person: {
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    birthDate: number,
    photoUrl: string,
  }
}

const PoliticianCard: React.FC<PoliticianCardProps> = ({ person: { firstName, lastName, description, photoUrl } }) => {

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item lg={10}>
            <PoliticianDetails firstName={firstName} lastName={lastName} photoUrl={photoUrl} description={description} />
          </Grid>
          <Grid item lg={2} sm={12} >
            <Box display='flex' flexGrow={1} justifyContent="flex-end">
              <Link>show profile</Link>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}


export default PoliticianCard