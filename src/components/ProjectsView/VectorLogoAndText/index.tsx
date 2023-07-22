import { motion } from 'framer-motion';
import React from 'react';
import { Theme } from 'styled-components';
import { createStyledMotionComponent } from '../../../utils/createStyledMotionComponent';


interface VectorLogoAndTextProps {
    text: string;
    logo: string;
    font?: string;
    theme?: Theme
}

const StyledWrapper = createStyledMotionComponent('div')(props => `
    color: ${props.theme.text};
    font-family: '${props.font ?? 'Roboto'}';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`);

const AlignmentStyles = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${props.font === 'Teko' ? '5rem' : '2.5rem'};
    font-weight: 700;
    width: 100%;
    color: ${props.theme.text};
`);

const StyledLogo = createStyledMotionComponent('img')(props => `
    height: auto;
    max-height: 15rem;
    width: auto;
    margin-bottom: 0.5rem;
`);



export default function VectorLogoAndText({ text, logo, font, theme }: VectorLogoAndTextProps) {

    const hoverEffects = {
        hover: {
            scale: 1.1
        },
        rotateEffect: {
            rotateY: 0,
            rotateX: 0
        }
    };

    return (
        <StyledWrapper theme={theme} font={font}>
            <AlignmentStyles theme={theme}>
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={hoverEffects.hover}
                    transition={{ duration: 0.5 }}
                >
                    <StyledLogo src={logo} alt="logo" />
                </motion.div>
            </AlignmentStyles>
        </StyledWrapper>
    );
}
