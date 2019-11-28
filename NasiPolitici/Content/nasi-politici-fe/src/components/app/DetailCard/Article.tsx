import React from 'react'
import { Box, Typography, Chip } from '@material-ui/core'
import { WrapperDivider } from './style'
import styled from 'styled-components'

const ArticlePreview: React.FC = () => {
  return (
    <React.Fragment>
      <Box mt={2}>
        <Typography variant='subtitle1' color='textSecondary'>E15, 21. října 2019</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant='h4'>ČR získala z EU agrární dotace za 150 miliard Kč, nejvíce Novák</Typography>
      </Box>
      <Box mt={2} mb={2}>
        <Typography variant="body2">Tuzemské firmy získaly od vstupu do Evropské unie zemědělské dotace v objemu přes 150 miliard korun. </Typography>
      </Box>
      <TagsContainer>
        <Tag label="Fake" />
        <Tag label="News" />
      </TagsContainer>
      <WrapperDivider variant='fullWidth' />
    </React.Fragment>
  )
}

const TagsContainer = styled.div`
  margin: 16px -8px;
`;

const Tag = styled(Chip)`
  margin: 0 8px;
`;

export default ArticlePreview;