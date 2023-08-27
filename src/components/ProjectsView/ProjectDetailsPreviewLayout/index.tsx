import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType, generateProjectsData } from "../../../data/project.data";
import { motion } from "framer-motion";
import BoldHeaderText, { TextSize } from "../BoldHeaderText";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { absoluteBottomLeft, absoluteCenter, coverParent } from "../../../theming/util-style-functions/position";

interface ProjectDetailsLayoutProps {
    project: ProjectType;
    animate: "open" | "closed";
}

const StyledMotionDiv = createStyledMotionComponent('div')(props => `
    ${coverParent}
`);

const TopMiddlePane = createStyledMotionComponent('div')(props => `
    ${absoluteCenter}
    color: ${props.theme.text};
    font-size: 1.25rem;
    background: ${props.theme.panelBg};
    border-radius: 1rem;
    text-align: center;
`)

const BottomLeftPane = createStyledMotionComponent('div')(props => `
    ${absoluteBottomLeft}
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: ${props.theme.panelBg};
    border-radius: 1rem;
    padding-bottom: 2rem;
`);


const layoutVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0, },
};

const paneVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.95 },
};

const bottomLeftPaneVariants = {
    open: {
        opacity: 1,
        scale: 1,
    },
    closed: {
        opacity: 0,
        scale: 3,
    }
}

export const ProjectDetailsLayout: React.FC<ProjectDetailsLayoutProps> = ({ project, animate }) => {
    const theme = useTheme();

    return (
        <StyledMotionDiv
            initial="closed"
            animate={animate}
            variants={layoutVariants}
            transition={{ duration: 1, type: "spring", }}
            theme={theme}
        >
            <TopMiddlePane variants={paneVariants}>
                {project.overview}
            </TopMiddlePane>
            <BottomLeftPane variants={bottomLeftPaneVariants} transition={{ duration: 0.3 }}>
                <BoldHeaderText text={project.subtitle} font={generateProjectsData().x1dra.titleFont} size={TextSize.MEDIUM} opacity={0.6} />
                <BoldHeaderText text={project.name} font={generateProjectsData().x1dra.titleFont} size={TextSize.EXTRA_LARGE} opacity={0.6} color={project.primaryColor} />
            </BottomLeftPane>
        </StyledMotionDiv>
    );
};
