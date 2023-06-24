import React from 'react';
import TextTransition, { presets } from 'react-text-transition';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';
import ParticlesBg from 'particles-bg';
import { animated, useSpring } from 'react-spring';
import { useCursorEffect } from '../../hooks/useCursorEffect';
import { CursorContext } from '../../contexts/CursorContext';

const HeroContainer = styled(motion.div)`
  position: relative;
  display: flex;
  overflow: hidden; 
  width: 100%;
  min-width: 100vw;
`;

const Pane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 50%;
  max-width: 50%;
`;

const LeftPane = styled(Pane)`
  text-align: right;
`;

const RightPane = styled(Pane)`
  text-align: left;
`;


const HeroTitle = styled(animated.h1)`
  font-size:5rem;
  color: ${props => props?.theme?.colors?.primary};
  text-shadow: 0px 0px 10px ${props => props?.theme?.colors?.primary};
  text-aligh: flex-start;
  font-family: 'Orbitron';
  width: 100%;
`;

const HeroTagline = styled(animated.h2)`
  font-size: 1.5rem;
  color: ${props => props?.theme?.colors?.secondary};
  text-shadow: 0px 0px 10px ${props => props?.theme?.colors?.secondary};
  text-aligh: flex-start;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`;

const HeroButton = styled(motion.button)`
  background-color: ${props => props?.theme?.colors?.primary ?? 'purple'};
  color: ${props => props?.theme?.colors?.buttonText ?? 'white'};
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  text-transform: uppercase;
  padding: 1rem 3rem;
  font-weight: 900;

  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px ${props => props?.theme?.colors?.buttonBackground};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
  font-family: 'Orbitron';
  margin-top: 4rem;
`


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 }},
  exit: { opacity: 0, transition: { ease: 'easeInOut' }},
};

const TEXTS = [
    "Full Stack, Full Circle - From Idea Generation to Implementation to Deployment",
    "Where Innovation Intersects with Implementation: Crafting Digital Experiences",
    "Reshaping the Digital Landscape: Expertise that Delivers Impact",
    "Beyond Code: Crafting Interconnected Systems for a Smarter World"
];

const HeroComponent = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const cursorType = useCursorEffect();

  const springProps = useSpring({
    
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 80, friction: 14 }
  });

  React.useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(prevIndex => prevIndex + 1),
    3000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <CursorContext.Provider value={cursorType}>
      <HeroContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
        <RightPane>
          <HeroTitle theme={theme} style={springProps}>
            <div data-id="special">
              <TextTransition springConfig={ presets.gentle }>
                {TEXTS[index % TEXTS.length]} 
              </TextTransition>
            </div>
          </HeroTitle>

          <HeroTagline theme={theme} style={springProps}>
            Full-Stack Software Engineer
          </HeroTagline>
          <ButtonContainer>
              <HeroButton>
                  View Projects
              </HeroButton>
          </ButtonContainer>
          
        </RightPane>
      </HeroContainer>
    </CursorContext.Provider>
  );
};

export default withAnimations('fadeIn')(HeroComponent);
