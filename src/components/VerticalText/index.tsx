import React from "react";
import { createStyledMotionComponent } from "../../utils/createStyledMotionComponent";

interface VerticalTextProps {
    text: string;
    font: string;
}

const StyledWrapper = createStyledMotionComponent('div')(props => `
    color: ${props.theme.text};
    font-family: '${props.font ?? 'Roboto'}';
    display: flex;
    justify-content: center;
    align-items: center;
`);

const StyledText = createStyledMotionComponent('h1')(props => `
    color: ${props.theme.text};
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
`)

export default function VerticalText({ text, font }: VerticalTextProps) {
    return (
        <StyledWrapper font={font}>
            <StyledText font={font}>
                {text.split("").join("\n")}
            </StyledText>
        </StyledWrapper>
    );
}
