import React, { memo } from "react";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { GridElement } from "../GridElement";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { spacing } from "../../../theming/style-guide/spacing";
import { zIndex } from "../../../theming/style-guide/zIndex";

interface ProjectPickerProps {
    projects: ProjectData,
    selectedProject: ProjectType | null,
    setSelectedProject: (project: ProjectType | null) => void,
}
interface ProjectPickerProps {
    projects: ProjectData,
    selectedProject: ProjectType | null,
    setSelectedProject: (project: ProjectType | null) => void,
}

const ProjectPickerWrapper: any = createStyledMotionComponent('div')(props => `
    display: flex;
    justify-content: center;
    flex-direction: column;
`);

const ProjectPickerContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    z-index: ${zIndex.dropdown};
    background-color: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    justify-content: space-evenly;
    width: 100%;
    bottom: ${spacing.sm};
    @media (min-width: 768px) {
      bottom: ${spacing.md};
    }
`)

const GridElementContainer = createStyledMotionComponent('div')(props => `
  display: flex;
  padding: ${spacing.sm};
  @media (min-width: 768px) {
    padding: ${spacing.md};
  }
`)

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
            staggerChildren: 0.1, // this will animate each child with a delay of 0.1s
            delayChildren: 0.3 // this will delay the animation of all children by 0.3s
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
