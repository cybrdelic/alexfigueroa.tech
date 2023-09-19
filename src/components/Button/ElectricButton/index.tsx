import React, { useEffect, useRef } from 'react';

import { ButtonProps } from '..';
import { useAnimation } from 'framer-motion';
import { createStyledMotionComponent } from '../../../theming/styled-motion-utils/createStyledMotionComponent';
import { fontFamily } from '../../../theming/util-style-functions/typography';
import { zIndex } from '../../../theming/design-tokens/spacing';
import { useTheme } from '../../../hooks/useTheme';
import eventManager from '../../../event-handling/eventManager';
import { useCursorEffect } from '../../../hooks/useCursorEffect';


const glitchAnimation = `
  @keyframes glitch {
      0% {
          transform: translateX(30);
          clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
      }
      5% {
          clip-path: polygon(0 33%, 100% 33%, 100% 34%, 0 34%);
      }
      10% {
          clip-path: polygon(0 44%, 100% 44%, 100% 45%, 0 45%);
      }
      100% {
          transform: translateX(100);
      }
  }
`;

const glitchPositionAnimation = `
  @keyframes glitchPosition {
    0%, 9% {
      transform: translate(0, 0);
      opacity: 1;
    }
    9.5% {
      transform: translate(-10px, 5px);
      opacity: 0.2;
    }
    10% {
      transform: translate(10px, -5px);
      opacity: 0.2;
    }
    10.5% {
      transform: translate(-5px, 3px);
      opacity: 0.2;
    }
    11% {
      transform: translate(5px, -2px);
      opacity: 0.2;
    }
    11.5% {
      transform: translate(-3px, 2px);
      opacity: 0.2;
    }
    12% {
      transform: translate(3px, -1px);
      opacity: 0.2;
    }
    12.5% {
      transform: translate(0, 0);
      opacity: 0.3;
    }
    13% {
      transform: translate(-2px, 1px);
      opacity: 0.2;
    }
    13.5%, 100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  };
`;


const ProfessionalButtonBase = createStyledMotionComponent('button')(props => `
    background-color: ${'transparent'};
    overflow: visible;
    border: 2px solid ${props.backgroundColor};
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 18px;
    ${fontFamily()}
    ${zIndex.foreground}
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    position: relative;
    overflow: hidden;
    color: ${props.backgroundColor};10px ${props.backgroundColor};
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    animation: glitchPosition 5.5s ease-in-out infinite;  // Now, the entire cycle is 5.5 seconds
    ${glitchPositionAnimation}
    ${glitchAnimation}
    &:hover {
        box-shadow: 0 8px 20px ${props.backgroundColor};
        transform: scale(5);
    };
    &:active {
        box-shadow: 0 2px 5px ${props.backgroundColor};
        transform: scale(0.95);
    };

    &:before, &:after {
        content: "";
        position: absolute;
        top: -20px;
        left: -20px;
        width: calc(100% + 40px);
        height: calc(100% + 40px);
        z-index: ${zIndex.foreground};
        background: ${props.backgroundColor};
        transform: translateX(50px) translateY(30px) scale(500%);
    }

    &:before {
        animation: glitch 1.5s infinite alternate-reverse;
        clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
        filter: hue-rotate(45deg);
        height: 20rem;
        width: 80rem;
        background-color: ${props.backgroundColor};
        transform: translateX(50px) translateY(30px) scale(500%);
    }

    &:after {
        animation: glitch 1.3s infinite alternate-reverse;
        clip-path: polygon(0 50%, 100% 50%, 100% 53%, 0 53%);
        filter: hue-rotate(-45deg);
        background-color: ${props.backgroundColor};
        height: 40rem;
        transform: translateX(50px) translateY(30px) scale(500%);
    }
`);

const ElectricButton: React.FC<ButtonProps> = (props) => {
  const controls = useAnimation();
  const theme = useTheme();


  return (
    <ProfessionalButtonBase
      animate={controls}
      theme={theme}
      data-id="special"
      {...props}
    >
      {props.children}
    </ProfessionalButtonBase>
  );
}

export default ElectricButton;
