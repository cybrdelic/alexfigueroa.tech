import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface BoldHeaderTextProps {
    text: string;
    font?: string;
}

const MotionDiv = motion.div;

const StyledWrapper = styled(MotionDiv) <{ font?: string }>`
    color: ${props => props.theme.text};
    font-family: ${props => props.font ?? 'Roboto'}, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem; // Add some padding around the text
    margin: 1rem 0;  // Add some margin around the wrapper
`;

const StyledText = styled(motion.h1) <{ font?: string }>`
    color: ${props => props.theme.text};
    font-size: 8rem;
    text-align: center;
    letter-spacing: -2px;  // Slightly negative letter-spacing for better typography at large sizes
    word-spacing: 5px;     // Word spacing for better readability
    line-height: 1.2;      // Line height for better vertical rhythm

    // Add a subtle text-shadow for depth
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

    // Animation for a bit of pizzazz
    transition: color 0.5s ease, text-shadow 0.5s ease;
    &:hover {
        color: ${props => props.theme.accent};
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
`;

const BoldHeaderText: React.FC<BoldHeaderTextProps> = ({ text, font }) => {
    return (
        <StyledWrapper font={font}>
            <StyledText font={font}>
                {text}
            </StyledText>
        </StyledWrapper>
    );
}

export default BoldHeaderText;
