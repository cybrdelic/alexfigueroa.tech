import { motion, AnimateSharedLayout, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import styled, { css, keyframes } from 'styled-components';
import useCarouselLayoutAnimation from '../../hooks/animation/useCarouselLayoutAnimation';
import { backgroundColor } from '../../theming/util-style-functions/colors';
import { useTheme } from '../../hooks/useTheme';
import { useAlternateTheme } from '../../hooks/theming/useAlternateTheme';
import { zIndex } from '../../theming/design-tokens';

const pulsate = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 10px #fff; }
  50% { transform: scale(1.05); box-shadow: 0 0 20px #fff; }
  100% { transform: scale(1); box-shadow: 0 0 10px #fff; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #fff; }
  50% { box-shadow: 0 0 10px #fff, 0 0 20px #fff; }
  100% { box-shadow: 0 0 5px #fff; }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5%;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  animation: ${pulsate} 1.5s infinite, ${glow} 1.5s infinite;

  &:hover {
    background-color: #555;
    transform: translateY(-50%) scale(1.1); // slight increase in scale
    box-shadow: 0 0 25px #fff, 0 0 30px #fff; // enhanced glow on hover
}

`;


export const Container = createStyledMotionComponent('div')(props => `
  position: relative;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  perspective: 1500px;
`);

export const CarouselItem = createStyledMotionComponent('div')(props => css`
  position: absolute;
  top: 10%;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  transition: all 0.3s ease-in;  // enhanced timing
  transform-style: preserve-3d;
  filter: brightness(1.2);
  z-index: ${zIndex.default};

  &:hover {
    filter: brightness(1.5); // brighten on hover
    }
`);

const ProgressBar = createStyledMotionComponent('div')(props => css`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`);

const Indicator = createStyledMotionComponent('div')(props => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  ${backgroundColor(useAlternateTheme(), 'background')}
  margin: 0 5px;
  opacity: 0.3;
  transition: transform 0.3s, opacity 0.3s;

  &.active {
    transform: scale(1.5);
    opacity: 1;
    animation: ${pulsate} 1.5s infinite, ${glow} 1.5s infinite;
  }
`);

const Carousel = ({ items }) => {
  const {
    next,
    activeIndex,
    getPreviousIndex,
    getNextIndex,
    getPropsForStatus
  } = useCarouselLayoutAnimation(items);

  const theme = useTheme()

  return (
    <Container>
      <CarouselItem
        key={getPreviousIndex()}
        {...getPropsForStatus('previous')}
      >
        {items[getPreviousIndex()]}
      </CarouselItem>

      <CarouselItem
        key={activeIndex}
        {...getPropsForStatus('active')}
      >
        {items[activeIndex]}
      </CarouselItem>

      <CarouselItem
        key={getNextIndex()}
        {...getPropsForStatus("next")}  // Spread the properties
      >
        {items[getNextIndex()]}
      </CarouselItem>
      <NextButton onClick={next}>Next</NextButton>
      <ProgressBar>
        {items.map((_, index) => (
          <Indicator
            key={index}
            className={index === activeIndex ? 'active' : ''}
            theme={theme}
          />
        ))}
      </ProgressBar>
    </Container>
  );
}

export default Carousel;
