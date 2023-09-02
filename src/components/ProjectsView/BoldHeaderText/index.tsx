import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import { Theme } from "../../../theming/theme";

interface BoldHeaderTextProps {
    text: string;
    font?: string;
    opacity?: number;
    color?: string;
    size?: TextSize;
}

// Create an enum for the text size
export enum TextSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    EXTRA_LARGE = 'extra large',
    BEHEMOTH = 'behemoth'
}

// Map the sizes to actual CSS values
const sizeMap: { [key in TextSize]: string } = {
    [TextSize.SMALL]: '2rem',
    [TextSize.MEDIUM]: '4rem',
    [TextSize.LARGE]: '8rem',
    [TextSize.EXTRA_LARGE]: '12rem',
    [TextSize.BEHEMOTH]: '16rem',
}

const getTextColor = (theme: Theme, fontColor: string, opacity: number) => {
    if (!opacity) {
        opacity = 1
    }

    if (!fontColor) {
        fontColor = theme.colors.text
    }

    const textColor = adjustTransparency(fontColor, opacity)

    return textColor;
}

const MotionDiv = createStyledMotionComponent('div')(props => `
    color: ${getTextColor(props.theme, props.fontColor, props.opacity)};
    font-family: ${props.font || 'Roboto'}, sans-serif;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    perspective: 1000px;
    margin: 0;
    padding: 0;
`);

const StyledText = createStyledMotionComponent('h1')(props => `
    color: ${getTextColor(props.theme, props.fontColor, props.opacity)};
    font-size: ${sizeMap['medium']};
    letter-spacing: -2px;
    word-spacing: 5px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    transition: color 0.5s ease, text-shadow 0.5s ease, transform 0.5s ease;
    transform-style: preserve-3d;
    margin: 0;
    padding: 0;

    &:hover {
        color: ${props.theme.accent};
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        transform: rotateY(180deg);
    }
`);

const BoldHeaderText: React.FC<BoldHeaderTextProps> = ({ text, font, color, opacity, size = TextSize.MEDIUM }) => (
    <MotionDiv fontColor={color} opacity={opacity} font={font}>
        <StyledText fontColor={color} opacity={opacity} font={font} size={size} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            {text}
        </StyledText>
    </MotionDiv>
);

export default BoldHeaderText;
