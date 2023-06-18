import React from 'react';
import TextTransition, { presets } from 'react-text-transition';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { withAnimations } from '../../hooks/animation/withAnimations';
import { useTheme } from '../../hooks/useTheme';
import ParticlesBg from 'particles-bg';
import { animated, useSpring } from 'react-spring';

const HeroContainer = styled(motion.div)`
  position: relative;
  text-align: center;
  padding: 2rem;
  overflow: hidden; 
`;

const HeroTitle = styled(animated.h1)`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  text-shadow: 0px 0px 10px ${props => props.theme.colors.primary};
`;

const HeroTagline = styled(animated.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.secondary};
  text-shadow: 0px 0px 10px ${props => props.theme.colors.secondary};
`;

const HeroButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.buttonBackground};
  color: ${props => props.theme.colors.buttonText};
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px ${props => props.theme.colors.buttonBackground};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 }},
  exit: { opacity: 0, transition: { ease: 'easeInOut' }},
};

const TEXTS = ['Developer', 'Designer', 'Creator'];

const HeroComponent = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);

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
    <HeroContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <ParticlesBg type="cobweb" bg={true} />

      <HeroTitle theme={theme} style={springProps}>
        <TextTransition springConfig={ presets.gentle }>
            {TEXTS[index % TEXTS.length]} 
        </TextTransition>
      </HeroTitle>

      <HeroTagline theme={theme} style={springProps}>
        Your Awesome Tagline
      </HeroTagline>

      <HeroButton theme={theme}>
        Discover More
      </HeroButton>
    </HeroContainer>
  );
};

export default withAnimations('fadeIn')(HeroComponent);
