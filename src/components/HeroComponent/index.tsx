import React, { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { animated, useSpring } from 'react-spring';
import { flexColumn } from '../../theming/util-style-functions/layout';
import { padding } from '../../theming/util-style-functions/spacing';
import { backgroundColor, textColor } from '../../theming/util-style-functions/colors';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { rounded } from '../../theming/util-style-functions/misc';
import { fontFamily, fontSize, fontWeight, letterSpacing } from '../../theming/util-style-functions/typography';
import { projectsData } from '../../data/project.data';

const HeroContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-start;
  width: 100%;
  flex-basis: 30%;
`;

const Pane = styled.div`
  ${flexColumn}
  ${padding('sm')}
`;

const LeftPane = styled(Pane)`
  text-align: right;
`;

const RightPane = styled(Pane)`
  text-align: left;
  border-radius: 25px;
  background-color: rgba(250,250,250,1);
  height: 20rem;
  max-height: 20rem;
  flex-basis: 40%;
  margin-left: 1rem;
`;

const revealAnimation = keyframes`
  0% {
    clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const HeroTitle = styled(motion.h1)`
  ${fontSize('h4')}
  ${fontFamily("Nova Square")}
  font-weight: 900;
  width: 60%;
  text-transform: uppercase;
  position: relative;
  text-align: left;
  color: white;
  overflow: hidden;
  animation: ${revealAnimation} 3s linear;
`;

const HeroTagline = createStyledMotionComponent(animated.h2)(props => `
  ${fontSize('small')}
  ${letterSpacing('wider')}
  font-weight: 900;
  background-color: black;
  padding: 0.5rem;
  border-radius: 10px;
  color: white;
  text-shadow: 0px 0px 10px ${props?.theme?.colors?.secondary};
  text-align: flex-start;
  width: 50%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  color: ${projectsData.CodebasedUtils.colors.secondary}
`);

const TopHalf = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100%;
`)

const HeroSection = createStyledMotionComponent('div')(props => `
  ${flexColumn}
  align-items: flex-start;
  gap: 0rem;
  flex-basis: 70%;

`)

const HeroComponent = () => {
  const theme = useTheme();
  const springProps = useSpring({

    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 0, friction: 14 },
    duration: 0.1
  });

  return (
    <TopHalf>

      <HeroSection>

        <HeroTitle theme={theme}>
          Streamlined Solutions – Full-Stack Development with an Eye for Automation
        </HeroTitle>
        <HeroTagline theme={theme} style={springProps}>
          Full-Stack Development Meets Full-Cycle Automation.
        </HeroTagline>

      </HeroSection>
      <HeroContainer>
        <li style={{ backgroundImage: `url('/background.png')`, width: '60rem', height: '20rem', borderRadius: '25px', minHeight: '20rem' }}>
        </li>
        <RightPane>

        </RightPane>
      </HeroContainer>

    </TopHalf>
  );
};
export default HeroComponent
