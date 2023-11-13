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
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Pane = styled.div`
  ${flexColumn}
  ${padding('sm')}
`;

const CTAButton = styled(motion.button)`
  ${padding('md')}
  ${rounded('lg')}
  ${fontFamily()}
  background-color: ${projectsData.CodebasedUtils.colors.secondary};
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0.5rem;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; // Darken on hover, adjust as per theme
  }
`;

const GhostButton = styled(CTAButton)`
  background-color: transparent;
  color: white; // Same as the CTAButton color
  border: 2px solid ${projectsData.CodebasedUtils.colors.secondary};

  &:hover {
    background-color: rgba(0, 123, 255, 0.1); // Slight background on hover
  }
`;
const CTASection = styled(Pane)`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 30%;
`;

const RightPane = styled(Pane)`
  text-align: left;
  border-radius: 25px;
  background-color: rgba(250,250,250,1);
  height: 20rem;
  max-height: 20rem;
  width: 40%;
  margin-left: 1rem;
  flex-grow: 1;
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
  width: 100%;
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
  width: 100%;
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

const Top = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
`)
const Bottom = createStyledMotionComponent('div')(props => css`
  display: flex;
  flex-direction: row;
  width: 100%;
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

      <Top>
        <HeroSection>
          <HeroTagline theme={theme} style={springProps}>
            Full-Stack Development Meets Full-Cycle Automation.
          </HeroTagline>
          <HeroTitle theme={theme}>
            Streamlined Solutions – Full-Stack Development with an Eye for Automation
          </HeroTitle>

        </HeroSection>
        <CTASection>
          <CTAButton as="a" href="/projects" >
            View My Projects
          </CTAButton>
          <GhostButton as="a" href="mailto:your.email@example.com">
            Get In Touch
          </GhostButton>
        </CTASection>
      </Top>
      <Bottom>
        <HeroContainer>
          <li style={{ backgroundImage: `url('/background.png')`, width: '60rem', borderRadius: '25px', height: '100%' }}>
          </li>
          <RightPane>

          </RightPane>
        </HeroContainer>
      </Bottom>

    </TopHalf >
  );
};
export default HeroComponent
