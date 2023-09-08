import { motion, AnimateSharedLayout, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';

import styled, { css, keyframes } from 'styled-components';

const pulsate = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  animation: ${pulsate} 1.5s infinite;  // Pulsating animation

  &:hover {
    background-color: #555;
  }
`;

export const Container = createStyledMotionComponent('div')(props => `
  position: relative;
  width: 100vw;
  height: 100vh;
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
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  transform-style: preserve-3d;
  filter: brightness(1.2);  // Slightly increased brightness for a glowing effect
`);

const getAnimationProps = (status) => {
    switch (status) {
        case 'active':
            return {
                transform: "rotateY(0deg) scale(1.05)",  // Slightly larger scale
                left: 0,
                filter: 'blur(0px) brightness(1.2)'
            };
        case 'previous':
            return {
                transform: "rotateY(-45deg) scale(0.5)",  // Added depth with translateZ
                left: "-300%",
                filter: 'blur(60px) brightness(0.5)'
            };
        case 'next':
            return {
                transform: "rotateY(45deg) scale(0.8)",  // Added depth with translateZ
                zIndex: 0,
                left: '50%',
                filter: 'blur(40px) brightness(0.5)'
            };
        default:
            return {};
    }
};

const Carousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const getPreviousIndex = () => (activeIndex - 1 + items.length) % items.length;
    const getNextIndex = () => (activeIndex + 1) % items.length;

    return (
        <Container>
            <LayoutGroup>
                <CarouselItem
                    layout
                    layoutId={`item-${getPreviousIndex()}`} // Using index as layoutId
                    key={getPreviousIndex()}  // Using index as key
                    initial={false}
                    animate={getAnimationProps("previous")}
                >
                    {items[getPreviousIndex()]}
                </CarouselItem>

                <CarouselItem
                    layout
                    layoutId={`item-${activeIndex}`}  // Using index as layoutId
                    key={activeIndex}  // Using index as key
                    initial={false}
                    animate={getAnimationProps("active")}
                >
                    {items[activeIndex]}
                </CarouselItem>

                <CarouselItem
                    layout
                    layoutId={`item-${getNextIndex()}`}  // Using index as layoutId
                    key={getNextIndex()}  // Using index as key
                    initial={false}
                    animate={getAnimationProps("next")}
                >
                    {items[getNextIndex()]}
                </CarouselItem>
            </LayoutGroup>
            <NextButton onClick={next}>Next</NextButton>
        </Container>
    );
}


export default Carousel;
