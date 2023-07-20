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
import Tilt from 'react-parallax-tilt';

interface StyledFlexElementProps {
    theme: any;
}

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border: solid 0.1rem ${props.isActive ? props.projectPrimaryColor : adjustTransparency(props.theme.text, 0)};
    border-radius: 60px;
    transition: all 0.3s ease-in-out;
    max-width: 200px;
    min-width: 200px;
    max-height: 200px;
    overflow: hidden;

    &:hover {
        transform: scale(1.05);
        border: solid 0.1rem ${adjustTransparency(props.theme.text, 0.2)};
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
    isActive: boolean;
}

export const GridElement: React.FC<GridElementProps> = ({ project, handleMouseEnter, handleMouseLeave, isActive }) => {
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
                isActive={isActive}
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

export const MotionGridElement = createStyledMotionComponent(GridElement);
