import React from 'react'
import PoliticianAvatar from './PoliticianAvatar';
import { Box, Typography } from '@material-ui/core';
import { useDesktop } from '../../../hooks';

interface PoliticianDetailsProps {
  firstName: string,
  lastName: string,
  photoUrl: string,
  description: string
}

const PoliticianDetails: React.FC<PoliticianDetailsProps> = ({ firstName, lastName, photoUrl, description }) => {
  const isDesktop = useDesktop();

  return (
    <Box display="flex">
      <PoliticianAvatar image={photoUrl} />
      <Box ml={2}>
        <Typography variant='h1'>{`${firstName} ${lastName}`}</Typography>
        {isDesktop && <Typography variant='h3'>{description}</Typography>}
      </Box>
    </Box>
  )
}

export default PoliticianDetails
