import React from 'react'
import { WrapperDivider } from './style'
import { Box } from '@material-ui/core';
import ArticlePreview from './Article';


const ArticlesList: React.FC = () => {
  return (
    <Box p={2}>
      <WrapperDivider variant='fullWidth' />
      <ArticlePreview />
    </Box>
  )
}

export default ArticlesList