import React from "react"

import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { useTheme } from "../../../hooks/useTheme";
import { ButtonProps } from "..";

const GhostButtonBase = createStyledMotionComponent('button')((props) => `
    background-color: transparent;
    color: ${props.backgroundColor};
    border: 2px solid ${props.backgroundColor};
    transition: all 0.4s;

    &:hover {
        background-color: ${props.backgroundColor};
        color: #fff;
    }
`);

const GhostButton: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();

    return (
        <GhostButtonBase
            theme={theme}
            {...props}
        >
            {props.children}
        </GhostButtonBase>
    );
}

export default GhostButton;
