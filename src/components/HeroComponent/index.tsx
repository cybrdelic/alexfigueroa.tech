import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fontFamily } from '../../theming/util-style-functions/typography';

// Main container for the hero section
const HeroContainer = styled.div`
margin-top: 0rem;

`;

// Top panel with image
// Animated text
const AnimatedText = styled(motion.h1)`
  font-size: 20rem;
  color: #00F5FF; // Neon blue
  text-transform: uppercase;
  white-space: wrap;
  width: 100%;
  height: 100%;
  font-weight: 900;
  line-height: 16rem;
  ${fontFamily('Teko')}
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
`;

// HeroComponent
const HeroComponent = () => {
  return (
    <HeroContainer>
      <AnimatedText>
        Where Full-Stack Meets Automation
      </AnimatedText>
    </HeroContainer>
  );
};

export default HeroComponent;
