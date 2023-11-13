import { useEffect } from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import styled, { css, keyframes } from 'styled-components';
import useCarouselLayoutAnimation from '../../hooks/animation/useCarouselLayoutAnimation';
import { backgroundColor } from '../../theming/util-style-functions/colors';
import { useSetDynamicBackground, useTheme } from '../../hooks/useTheme';
import { useAlternateTheme } from '../../hooks/theming/useAlternateTheme';
import { zIndex } from '../../theming/design-tokens';
import { ProjectType } from '../../data/project.data';
import ProjectPreview from '../ProjectPreview';

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
  right: 0px; // Adjust as needed
  width: 50px; // Circular button
  height: 50px;
  border-radius: 50%; // Makes it circular
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${pulsate} 2s infinite;

  &:hover {
    transform: scale(1.1); // Slightly increase size on hover
    box-shadow: 0 0 15px #fff, 0 0 20px #fff; // Enhanced glow on hover
  }

  &:before {
    content: '➔'; // Arrow icon
    font-size: 1.5em; // Adjust icon size
  }
`;



const Container = createStyledMotionComponent('div')(props => `
  position: relative; // Parent container with relative positioning
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  perspective: 1500px;
`);

export const CarouselItem = createStyledMotionComponent('div')(props => css`
  position: absolute; // Positioned absolutely within Container
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease-in;  // enhanced timing
  transform-style: preserve-3d;
  filter: brightness(1.2);
  padding-left: 3%;
  max-height: 100%;
  z-index: ${zIndex.default};
  &:hover {
    filter: brightness(1.5); // brighten on hover
    }
`);


interface CarouselProps {
  items: ProjectType[];
  onActiveProjectChange?: (activeIndex: number) => void; // New callback prop
  // ... other props
}


const Carousel = ({ items, onActiveProjectChange }: CarouselProps) => {
  const {
    next,
    activeIndex,
    getPreviousIndex,
    getNextIndex,
    getPropsForStatus
  } = useCarouselLayoutAnimation(items);

  const theme = useTheme();
  const setDynamicBackground = useSetDynamicBackground();

  useEffect(() => {
    const activeProjectColor = items[activeIndex]?.colors?.primary;
    if (activeProjectColor) {
      setDynamicBackground(activeProjectColor); // Update the dynamic background color
    }
  }, [activeIndex, items, setDynamicBackground]);

  useEffect(() => {
    if (onActiveProjectChange) {
      onActiveProjectChange(activeIndex);
    }
  }, [activeIndex, onActiveProjectChange]);

  return (
    <Container>
      <div>
        {items.map((project, index) => {
          // Determine the status of the carousel item
          const status = index === activeIndex ? 'active' :
            index === getPreviousIndex() ? 'previous' :
              index === getNextIndex() ? 'next' : 'inactive';

          return (
            <CarouselItem
              key={project.id}
              {...getPropsForStatus(status)} // Apply animation props based on status
            >
              <ProjectPreview project={project} isActive={status === 'active'} activeIndex={activeIndex} />
            </CarouselItem>
          );
        })}
      </div>
      <NextButton onClick={next}></NextButton>
    </Container>
  );
}

export default Carousel;
