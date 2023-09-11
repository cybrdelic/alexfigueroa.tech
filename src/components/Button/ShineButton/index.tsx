import { css } from "styled-components";
import { useTheme } from "../../../hooks/useTheme";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { ButtonProps } from "..";

const ShineEffect = `
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        transform: skewX(-20deg) translateX(200%);
        transition: transform 0.7s;
    }

    &:hover:before {
        transform: skewX(-20deg) translateX(-300%);
    }
`;

const ShineButtonBase = createStyledMotionComponent('button')((props) => css`
    background-color: ${props.backgroundColor};
    color: #fff;
    border: 2px solid ${props.backgroundColor};
    position: relative;
    overflow: hidden;

    ${ShineEffect}
`);

const ShineButton: React.FC<ButtonProps> = (props) => {
    const theme = useTheme();

    return (
        <ShineButtonBase
            theme={theme}
            {...props}
        >
            {props.children}
        </ShineButtonBase>
    );
}

export default ShineButton
