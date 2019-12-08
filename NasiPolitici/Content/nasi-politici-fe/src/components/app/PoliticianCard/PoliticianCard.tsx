import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PoliticianDetails from './PoliticianDetails';
import { Grid} from '@material-ui/core';

interface PoliticianCardProps {
  person: {
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    birthDate: number,
    photoUrl: string,
    politicalParty: string;
  }
}

const PoliticianCard: React.FC<PoliticianCardProps> = ({ person }) => {

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item sm={10}>
            <PoliticianDetails {...person} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}


export default PoliticianCard