import { motion, AnimateSharedLayout, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import styled, { css, keyframes } from 'styled-components';
import useCarouselLayoutAnimation from '../../hooks/animation/useCarouselLayoutAnimation';

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
    transform: translateX(-50%) scale(1.05);
  }
`;


export const Container = createStyledMotionComponent('div')(props => `
  position: relative;
  width: 100vw;
  height: 90vh;
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
  filter: brightness(1.2);subtle shadow
`);

const Carousel = ({ items }) => {
    const {
        next,
        activeIndex,
        getPreviousIndex,
        getNextIndex,
        getPropsForStatus
    } = useCarouselLayoutAnimation(items);

    return (
        <Container>
            <LayoutGroup>
                <CarouselItem
                    layout
                    layoutId={`item-${getPreviousIndex()}`}
                    key={getPreviousIndex()}
                    {...getPropsForStatus('previous')}
                >
                    {items[getPreviousIndex()]}
                </CarouselItem>

                <CarouselItem
                    layout
                    layoutId={`item-${activeIndex}`}
                    key={activeIndex}
                    {...getPropsForStatus('active')}
                >
                    {items[activeIndex]}
                </CarouselItem>

                <CarouselItem
                    layout
                    layoutId={`item-${getNextIndex()}`}
                    key={getNextIndex()}
                    {...getPropsForStatus("next")}  // Spread the properties
                >
                    {items[getNextIndex()]}
                </CarouselItem>
            </LayoutGroup>
            <NextButton onClick={next}>Next</NextButton>
        </Container>
    );
}

export default Carousel;
