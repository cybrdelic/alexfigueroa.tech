import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { animated, useSpring } from 'react-spring';
import { flexColumn } from '../../theming/util-style-functions/layout';
import { padding } from '../../theming/util-style-functions/spacing';
import { backgroundColor, textColor } from '../../theming/util-style-functions/colors';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { rounded } from '../../theming/util-style-functions/misc';
import { fontFamily } from '../../theming/util-style-functions/typography';

const HeroContainer = styled(motion.div)`
  ${flexColumn}
  width: 100%;
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
`;


const HeroTitle = createStyledMotionComponent(animated.h1)(props => `
  font-size:5rem;
  ${textColor(props.theme, 'text')}
  text-shadow: 0px 0px 10px ${props?.theme?.colors?.text};
  text-align: flex-start;
  ${fontFamily()}
  width: 100%;
`);

const HeroTagline = createStyledMotionComponent(animated.h2)(props => `
  font-size: 1.5rem;
  ${textColor(props.theme, 'text')}
  text-shadow: 0px 0px 10px ${props?.theme?.colors?.secondary};
  text-aligh: flex-start;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`);

const HeroButton = createStyledMotionComponent('button')(props => `
  ${backgroundColor(props.theme, 'background')}
  ${textColor(props.theme, 'text')};
  ${padding('md')}
  border: none;
  ${rounded('lg')}
  cursor: pointer;
  transition: transform 0.3s ease -in -out;
  text-transform: uppercase;
  font-weight: 900;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 10px ${props?.theme?.colors?.buttonBackground};
  }

  &:active {
    transform: scale(0.95);
  }
`);

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

const HeroComponent = () => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);

  const springProps = useSpring({

    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 0, friction: 14 },
    duration: 0.1
  });

  return (
    <HeroContainer>
      <RightPane>
        <HeroTitle theme={theme} style={springProps}>
          <div data-id="special">
            <div>Implementing solutions</div>
          </div>
        </HeroTitle>

        <HeroTagline theme={theme} style={springProps}>
          Full-Stack Software Engineer
        </HeroTagline>
        <ButtonContainer>
          <HeroButton theme={theme}>
            View Projects
          </HeroButton>
        </ButtonContainer>

      </RightPane>
    </HeroContainer>
  );
};
export default HeroComponent
