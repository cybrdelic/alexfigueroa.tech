// GridElement.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { useHoveredState } from "../../../hooks/animation/useHoveredState";
import { CursorContext } from "../../../contexts/CursorContext";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import VectorLogoAndText from "../VectorLogoAndText";
import styled from 'styled-components';
import { createStyledMotionComponent } from '../../../utils/createStyledMotionComponent';
import { adjustTransparency } from '../../../utils/adjustTransparency';

interface StyledFlexElementProps {
    theme: any;
}

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 15px;
    background: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent; // Add a border to avoid layout glitches on hover
    max-width: 200px;
    min-width: 200px;
    max-height: 200px;
    overflow: hidden;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 12px 24px 0px rgba(0,0,0,0.3);
        border-width: 5px; // Increase border width on hover
        border-color: ${props.projectPrimaryColor ?? 'red'}; // Make the border visible on hover
    }
`);

const ConstantSizeWrapper = createStyledMotionComponent('div')(props => `
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
`);


const hoverEffects = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3
        },
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
    }
};

interface GridElementProps {
    project: ProjectType;
    handleMouseEnter: (project: ProjectType) => void;
    handleMouseLeave: () => void;
}

export const GridElement: React.FC<GridElementProps> = ({ project, handleMouseEnter, handleMouseLeave }) => {
    const { isHovered, onHoverStart, onHoverEnd } = useHoveredState();
    const theme = useTheme();
    const cursorType = useCursorEffect();

    return (
        <CursorContext.Provider value={cursorType}>
            <StyledFlexElement
                projectPrimaryColor={project.primaryColor}
                isHovered={isHovered}
                key={project.id}
                onMouseEnter={() => { handleMouseEnter(project); onHoverStart(); }}
                onMouseLeave={() => { handleMouseLeave(); onHoverEnd(); }}
                whileHover={hoverEffects.hover}
                theme={theme}
                style={{ cursor: cursorType === 'hovered' ? 'pointer' : 'default' }}
                data-id="special"
            >
                <ConstantSizeWrapper>
                    <VectorLogoAndText
                        text={project.name}
                        logo={project.logo}
                        font={project.titleFont}
                        theme={theme}
                        data-id="special"
                    />
                </ConstantSizeWrapper>
            </StyledFlexElement>
        </CursorContext.Provider>
    );
};
