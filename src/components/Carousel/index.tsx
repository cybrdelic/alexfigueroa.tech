import { motion, AnimateSharedLayout, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';

import styled, { css, keyframes } from 'styled-components';

const blurIn = keyframes`
  from {
    filter: blur(5px);
    transform: scale(0.8);
  }
  to {
    filter: none;
    transform: scale(1);
  }
`;

const blurOut = keyframes`
  from {
    filter: none;
    transform: scale(1);
  }
  to {
    filter: blur(5px);
    transform: scale(0.8);
  }
`;

export const Container = createStyledMotionComponent('div')(props => `
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 1500px;
`);

export const CarouselItem = createStyledMotionComponent('div')(props => `
  position: absolute;
  top: 10%;
  transform: translateY(-50%);
  width: 80%;
  height: 80%;
  background: ${props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px;

  /* Position and styles for the active item */
  ${props.active && css`
    left: 10%;
    top: 10%;
    filter: none;
    transform: translateY(-50%) scale(1);
    z-index: 2;
  `}

  /* Position and styles for the inactive item */
  ${!props.active && css`
    left: 60%;
    top: 10%;
    filter: blur(5px);
    transform: translateY(-50%) scale(0.8);
    z-index: 1;
  `}
`);


const Carousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    return (
        <Container>
            <LayoutGroup>
                {items.map((item, index) => (
                    <CarouselItem
                        layout // Enables the layout animation
                        layoutId={item.color}
                        key={item.color} // Using color for key just for the demo. Consider a unique ID in a real-world scenario.
                        active={index === activeIndex}
                        bgColor={item.color}
                    >
                        <div>
                            {item.content}
                        </div>
                    </CarouselItem>
                ))}
            </LayoutGroup>
            <button style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} onClick={next}>Next</button>
        </Container>
    );
}

export default Carousel;
