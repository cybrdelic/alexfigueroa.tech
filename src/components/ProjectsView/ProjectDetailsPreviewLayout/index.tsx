import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType, generateProjectsData } from "../../../data/project.data";
import { motion } from "framer-motion";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import BoldHeaderText, { TextSize } from "../BoldHeaderText";
import { adjustTransparency } from "../../../utils/adjustTransparency";

interface ProjectDetailsLayoutProps {
    project: ProjectType;
    animate: "open" | "closed";
}

const StyledMotionDiv = createStyledMotionComponent('div')(props => `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`);

const TopMiddlePane = createStyledMotionComponent('div')(props => `
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props.theme.text};
    font-size: 1.25rem;
    background: ${props.theme.panelBg};
    border-radius: 1rem;
    text-align: center;
`)

const BottomLeftPane = createStyledMotionComponent('div')(props => `
    position: absolute;
    bottom: 0%;
    left: 0%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: ${props.theme.panelBg};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 2rem;
`);

const StyledButton = createStyledMotionComponent('button')(props => `
    font-size: 1rem;
    padding: 0.75em 1em;
    margin-top: 1em;
    border: none;
    border-radius: 0.5rem;
    background-color: ${props.theme.accent};
    color: ${props.theme.text};
    cursor: pointer;
    transition: background-color 0.5s ease;
    &:hover {
        background-color: ${props.theme.accentHover};
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
                {/* <button onClick={() => window.open(project.github_url, "_blank")}>Github</button> */}
                <BoldHeaderText text={project.subtitle} font={generateProjectsData().x1dra.titleFont} size={TextSize.MEDIUM} opacity={0.6} />
                <BoldHeaderText text={project.name} font={generateProjectsData().x1dra.titleFont} size={TextSize.EXTRA_LARGE} opacity={0.6} color={project.primaryColor} />
            </BottomLeftPane>
        </StyledMotionDiv>
    );
};
