import React from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { zIndex } from '../../theming/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundColor?: string;
}

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

const ProfessionalButtonBase = createStyledMotionComponent(motion.button)(props => `
    background-color: ${'transparent'};
    overflow: visible;
    border: 2px solid ${props.backgroundColor};
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 18px;
    cursor: pointer;
    outline: none;
    position: relative;
    overflow: hidden;
    color: white;
    text-shadow: 0 0 5px ${props.backgroundColor}, 0 0 10px ${props.backgroundColor};
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px ${props.backgroundColor};

    ${glitchAnimation}

    &:hover {
    box-shadow: 0 8px 20px ${props.backgroundColor};
    transform: scale(1.05);
}

    &:active {
    box-shadow: 0 2px 5px ${props.backgroundColor};
    transform: scale(0.95);
}

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

    const handleMouseEnter = () => {
        controls.start({
            scale: 1.05,
            boxShadow: `0 8px 20px ${props.backgroundColor}`,
        });
    };

    const handleMouseLeave = () => {
        controls.start({
            scale: 1,
            boxShadow: `0 5px 15px ${props.backgroundColor}`,
        });
    };

    const handleMouseDown = () => {
        controls.start({
            scale: 0.95,
            boxShadow: `0 2px 5px ${props.backgroundColor}`
        });
    };

    const handleMouseUp = () => {
        controls.start({
            scale: 1.05,
            boxShadow: `0 8px 20px ${props.backgroundColor}`,
        });
    };

    return (
        <ProfessionalButtonBase
            animate={controls}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            theme={theme}
            {...props}
        >
            {props.children}
        </ProfessionalButtonBase>
    );
}

export default ElectricButton;
