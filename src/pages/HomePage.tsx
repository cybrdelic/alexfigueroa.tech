import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';
import { fontFamily } from '../theming/util-style-functions/typography';
import PageSwitcher from '../components/PageSwitcher';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spline from '@splinetool/react-spline';



// Function to generate multiple text-shadows for layered typography effect
const layeredTextShadow = (color) => {
  let shadow = '';
  const size = 2; // Size of the layered effect
  for (let i = 1; i <= size; i++) {
    shadow += `${i * 1}px ${i * 1}px 0px ${color}, `;
  }
  return shadow.slice(0, -2); // Remove the trailing comma and space
};

// Main container for the hero section
const HeroContainer = styled.div`
  margin-top: 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

// Animated text
const AnimatedText = styled(motion.h1)`
  font-size: 6rem;
  color: #00F5FF; // Neon blue
  text-transform: uppercase;
  white-space: wrap; // Prevent wrapping to next line
  font-weight: 900;
  line-height: 6rem;
  margin-top: 0rem;
  text-shadow: ${layeredTextShadow('rgba(255, 255, 255, 0.5)')};
  user-select: none;
  cursor: pointer;
  ${fontFamily()}
`;

// Interactive span with hover effects
const InteractiveSpan = styled.span`
  display: inline-block;
  ${fontFamily()}
  color: #FF0077; // A contrasting color
  position: relative;
  cursor: pointer;
  font-size: 18rem;
  line-height: 14rem;
  transition: color 0.3s ease;

  // Hover state for the span
  &:hover {
    color: #FFFFFF; // Change color on hover

    // Hover effect for the text shadow
    &::after {
      content: attr(data-text); // Use the text as content
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      text-shadow: none;
      color: #FF0077;
      transition: all 0.3s ease;
      transform: scale(1.1); // Scale effect for the shadow
    }
  }
`;



// HeroComponent
const HomePage = () => {
  return (
    <>
      <HeroContainer>
        <AnimatedText
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          data-id="special"
        >
          <InteractiveSpan data-text="Where Full-Stack">Where Full-Stack</InteractiveSpan>
          Meets Automation
        </AnimatedText>

        <PageSwitcher />
      </HeroContainer>
    </>
  );
};

export default HomePage;
