// GridElement.tsx
import React from 'react';
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { useHoveredState } from "../../../hooks/animation/useHoveredState";
import { CursorContext } from "../../../contexts/CursorContext";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import VectorLogoAndText from "../VectorLogoAndText";

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem; // Increase padding
    border-radius: 15px;
    background: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); // Softer shadow
    transition: box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    max-width: 200px;
    min-width: 200px;
    max-height: 200px; // Increase max height
    overflow: hidden;
    @media (min-width: 768px) {
    }
`);

const ConstantSizeWrapper = createStyledMotionComponent('div')(props => `
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;  // Ensure the content doesn't overflow the wrapper
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
}
