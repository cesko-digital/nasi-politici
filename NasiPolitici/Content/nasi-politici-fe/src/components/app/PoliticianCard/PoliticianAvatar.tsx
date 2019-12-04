import React from 'react';
import styled, { withTheme } from 'styled-components'
import { Theme } from '@material-ui/core/styles'
interface PoliticianAvatarProps {
  image: string,
  theme: Theme,
}

const PoliticianAvatar: React.FC<PoliticianAvatarProps> = ({ image }) => {
  return <RoundedImage src={image} alt="" />
}

const RoundedImage = styled.img`
  border-radius: 50%;
  height: 170px;
  width: 170px;
  ${props => props.theme.breakpoints.down('sm')} { 
    width: 40px;
    height: 40px;
}
`;

export default withTheme(PoliticianAvatar)