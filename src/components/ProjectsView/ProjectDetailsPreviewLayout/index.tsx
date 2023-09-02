import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType, generateProjectsData } from "../../../data/project.data";
import { motion } from "framer-motion";
import BoldHeaderText, { TextSize } from "../BoldHeaderText";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { absoluteBottomLeft, absoluteCenter, coverParent } from "../../../theming/util-style-functions/position";
import { backgroundColor, textColor } from "../../../theming/util-style-functions/colors";
import { borderRadius } from "../../../theming/design-tokens/effects";
import { mq } from "../../../theming/util-style-functions/responsive";
import { fontSize } from "../../../theming/util-style-functions/typography";
import { padding } from "../../../theming/util-style-functions/spacing";

interface ProjectDetailsLayoutProps {
    project: ProjectType;
    animate: "open" | "closed";
}

const TopMiddlePane = createStyledMotionComponent('div')(props => `
    ${absoluteCenter};
    ${textColor(props.theme, 'secondary')};
    ${fontSize('large')};
    ${backgroundColor('info')};
    ${borderRadius.md};
    text-align: center;

    ${mq('md')} {
        ${fontSize('base')};
    }
`);

const BottomLeftPane = createStyledMotionComponent('div')(props => `
    ${absoluteBottomLeft};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    ${backgroundColor('info')};
    ${borderRadius.md};
    ${padding('lg')};

    ${mq('md')} {
        ${padding('md')};
    }
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

const ProjectDetailsContainer = createStyledMotionComponent('div')(props => `
    ${coverParent}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    ${mq('md')} {
        gap: 3rem;
    }
`);

export const ProjectDetailsLayout: React.FC<ProjectDetailsLayoutProps> = ({ project, animate }) => {
    const theme = useTheme();

    return (
        <ProjectDetailsContainer
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
        </ProjectDetailsContainer>
    );
};
