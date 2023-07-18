import React from 'react';
import styled from 'styled-components';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';

const FooterContainer = styled.div`
  text-align: center;
  color: ${props => props?.theme?.colors?.secondary};
  background-color: ${props => props?.theme?.colors?.background};
  padding: 2rem;
`;

const Footer = () => {
  const theme = useTheme();
  
  return (
    <FooterContainer theme={theme}>
      <p>© 2023 My Portfolio</p>
    </FooterContainer>
  );
}

export default withAnimations('fadeIn')(Footer);
