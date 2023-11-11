// GridElement.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { useHoveredState } from "../../../hooks/animation/useHoveredState";
import { createStyledMotionComponent } from '../../../theming/styled-motion-utils/createStyledMotionComponent';
import { adjustTransparency } from '../../../utils/adjustTransparency';
import { useNavigate } from 'react-router-dom';
import { flexCenter } from '../../../theming/util-style-functions/layout';
import { padding } from '../../../theming/util-style-functions/spacing';
import { rounded } from '../../../theming/util-style-functions/misc';
import { transition } from '../../../theming/util-style-functions/effects';

interface StyledFlexElementProps {
    theme: any;
}

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    ${flexCenter}
    flex-direction: column;
    ${padding('md')}
    background: linear-gradient(135deg, ${props.theme.colors.background} 0%, ${props.theme.colors.primary} 100%);
    ${rounded('lg')}
    ${transition('normal')}
    max-width: 220px;
    min-width: 220px;
    max-height: 220px;
    overflow: hidden;
    &:hover {
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.1);
        border: solid 0.1rem ${adjustTransparency(props.projectPrimaryColor, 1)};
    }
`);


const ConstantSizeWrapper = createStyledMotionComponent('div')(props => `
    width: 100%;
    height: 100%;
    ${flexCenter}
    overflow: hidden;
`);


const hoverEffects = {
    hover: {
        scale: 1.08,
        transition: {
            duration: 0.3,
            type: "spring",
            stiffness: 300
        },
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.1)"
    }
};

const exitTransition = {
    scale: [1, 2, 10],
    opacity: [1, 0, 0],
    transition: {
        duration: 0.5
    }
};

const clickTransition = {
    scale: [1, 0.9, 1],
    transition: {
        duration: 0.5,
    }
};

const activeGridElementExitTransition = {
    scale: [1, 2, 10],
    rotate: [0, 0],
    opacity: [1, 1],
    transition: {
        duration: 1
    }
}

interface GridElementProps {
    project: ProjectType;
    handleMouseEnter: (project: ProjectType) => void;
    handleMouseLeave: () => void;
    isActive: boolean;
}

export const GridElement: React.FC<GridElementProps> = ({ project, handleMouseEnter, handleMouseLeave, isActive }) => {
    const { isHovered, onHoverStart, onHoverEnd } = useHoveredState();
    const theme = useTheme();
    const navigate = useNavigate();
    const [exitAnim, setExitAnim] = useState(exitTransition); // NEW

    const handleClick = () => {
        setExitAnim(activeGridElementExitTransition); // NEW
        setTimeout(() => {
            navigate(`/project/${project.branding.title}`);
        }, 500); // Adjust the delay as needed
    };


    const clickTransition = {
        scale: [1, 0.7, 1],
        transition: {
            duration: 0.7,
        }
    };


    return (
        <StyledFlexElement
            projectPrimaryColor={project.colors.primary}
            isHovered={isHovered}
            key={project.id}
            onMouseEnter={() => { handleMouseEnter(project); onHoverStart(); }}
            onMouseLeave={() => { handleMouseLeave(); onHoverEnd(); }}
            whileHover={hoverEffects.hover}
            whileTap={clickTransition}
            theme={theme}
            style={{ cursor: cursorType === 'hovered' ? 'pointer' : 'default' }}
            data-id="special"
            isActive={isActive}
            as={motion.div}
            exit={exitAnim}
        >
            <ConstantSizeWrapper exit={exitTransition}>
                {/* <VectorLogoAndText
                    text={project.name}
                    logo={project.logo}
                    font={project.title_font}
                    theme={theme}
                    data-id="special"
                /> */}
                {project.branding.title}
            </ConstantSizeWrapper>
        </StyledFlexElement>
    );
};

export const MotionGridElement = createStyledMotionComponent(GridElement);
