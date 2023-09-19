import React, { memo } from "react";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import { GridElement } from "../GridElement";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { borderColor, gradientBackground } from "../../../theming/util-style-functions/colors";
import { mq } from "../../../theming/util-style-functions/responsive";
import { padding } from "../../../theming/util-style-functions/spacing";
import { zIndex } from "../../../theming/design-tokens/spacing";
import { relativeLeft } from "../../../theming/util-style-functions/position";

interface ProjectPickerProps {
    projects: ProjectData;
    selectedProject: ProjectType | null;
    setSelectedProject: (project: ProjectType | null) => void;
}

const ProjectPickerWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(135deg, ${props.theme.colors.background} 0%, ${props.theme.colors.primary} 100%);
`);

const ProjectPickerContainer = createStyledMotionComponent('div')(props => `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    z-index: ${zIndex.dropdown};
    ${relativeLeft('0')}

    ${mq('md')} {
        ${padding('md')}
    }
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
`);


const GridElementContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    /* width: calc(50% - 10px); */  // No longer needed
    margin-bottom: 2rem;
    border: 2px solid;
    ${borderColor(props.theme, 'gray')}
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    }
    ${padding('sm')}
    ${mq('md')} {
        ${padding('md')}
    }
`);



const MemoizedGridElement = memo(GridElement);

const listVariants = {
    initial: {
        opacity: 0,
        y: '20%'
    },
    in: {
        opacity: 1,
        y: '0%',
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2
        },
    }
};

export default function ProjectPicker(props: ProjectPickerProps) {
    const { projects, selectedProject, setSelectedProject } = props;

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
                        onMouseEnter={() => handleMouseEnter(project)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <MemoizedGridElement
                            project={project}
                            isActive={selectedProject?.id === project.id}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                        />
                    </GridElementContainer>
                ))}
            </ProjectPickerContainer>
        </ProjectPickerWrapper>
    )
}
