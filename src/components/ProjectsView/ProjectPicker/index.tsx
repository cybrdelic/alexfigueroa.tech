import React, { memo } from "react";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { GridElement } from "../GridElement";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { backgroundColor } from "../../../theming/util-style-functions/colors";
import { mq } from "../../../theming/util-style-functions/responsive";
import { padding } from "../../../theming/util-style-functions/spacing";
import { zIndex } from "../../../theming/design-tokens/spacing";

interface ProjectPickerProps {
    projects: ProjectData,
    selectedProject: ProjectType | null,
    setSelectedProject: (project: ProjectType | null) => void,
}

const ProjectPickerWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    justify-content: center;
    flex-direction: column;
`);

const ProjectPickerContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    z-index: ${zIndex.dropdown};
    ${backgroundColor('light')} // use the light color from the design tokens
    justify-content: space-evenly;
    width: 100%;
    ${padding('sm')}
    ${mq('md')} {
      ${padding('md')}
    }
`);

const GridElementContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    ${padding('sm')}
    ${mq('md')} {
      ${padding('md')}
    }
`);

const MemoizedGridElement = memo(GridElement);

const gridElementVariants = {
    initial: {
        x: '-50px',
        y: '-50px',
        opacity: 0,
    },
    in: {
        x: 0,
        y: 0,
        opacity: 1,
    }
};

const gridTransition = {
    type: "spring",
    damping: 20,
    stiffness: 100
};

const listVariants = {
    initial: {
        scale: 0,
        y: '200px',
        x: 0
    },
    in: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        },
        y: 0,
        scale: 1,
        x: 0
    },
    exit: {
        x: -100
    }
};

export default function ProjectPicker(props: ProjectPickerProps) {
    const { projects, selectedProject, setSelectedProject } = props;
    const cursorType = useCursorEffect();

    const handleMouseEnter = (project: ProjectType) => {
        setSelectedProject(project);
    }

    const handleMouseLeave = () => {
        setSelectedProject(null);
    }

    return (
        <ProjectPickerWrapper variants={listVariants}>
            <ProjectPickerContainer>
                {Object.values(projects).map((project, index) => (
                    <GridElementContainer
                        key={project.id}
                        transition={gridTransition}
                        custom={index}
                        variants={gridElementVariants}
                    >
                        <MemoizedGridElement
                            project={project}
                            handleMouseEnter={handleMouseEnter}
                            isActive={selectedProject?.id === project.id}
                            handleMouseLeave={handleMouseLeave}
                        />
                    </GridElementContainer>
                ))}
            </ProjectPickerContainer>
        </ProjectPickerWrapper>
    )
}
