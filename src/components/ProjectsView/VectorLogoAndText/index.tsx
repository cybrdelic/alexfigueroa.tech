import { motion } from 'framer-motion';
import React from 'react';
import { Theme } from 'styled-components';
import { createStyledMotionComponent } from '../../../theming/styled-motion-utils/createStyledMotionComponent';
import { flexColumn } from '../../../theming/util-style-functions/layout';
import { margin } from '../../../theming/util-style-functions/spacing';
import { fontWeight } from '../../../theming/util-style-functions/typography';


interface VectorLogoAndTextProps {
    text: string;
    logo: string;
    font?: string;
    theme?: Theme
}

const StyledWrapper = createStyledMotionComponent('div')(props => `
    ${flexColumn}
    color: ${props.theme.text};
    font-family: '${props.font ?? 'Roboto'}';
    width: 100%;
`);

const AlignmentStyles = createStyledMotionComponent('div')(props => `
    ${flexColumn}
    font-size: ${props.font === 'Teko' ? '5rem' : '2.5rem'};
    ${fontWeight('bold')}
    width: 100%;
    color: ${props.theme.text};
`);

const StyledLogo = createStyledMotionComponent('img')(props => `
    height: auto;
    max-height: 15rem;
    width: auto;
    ${margin('xs')}
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
