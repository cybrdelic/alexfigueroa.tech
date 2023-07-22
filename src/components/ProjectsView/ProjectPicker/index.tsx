import React, { memo } from "react";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { GridElement } from "../GridElement";
import { adjustTransparency } from "../../../utils/adjustTransparency";

interface ProjectPickerProps {
    projects: ProjectData,
    selectedProject: ProjectType | null,
    setSelectedProject: (project: ProjectType | null) => void,
}

const ProjectPickerWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    padding-top: 1rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
    border-radius: 60px;
    margin: 30rem;
    background-color: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    z-index: 9999;
`);


const GridElementContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    padding: 2rem;

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
        y: '200px'
    },
    in: {
        transition: {
            staggerChildren: 0.1, // this will animate each child with a delay of 0.1s
            delayChildren: 0.3 // this will delay the animation of all children by 0.3s
        },
        y: 0,
        scale: 1
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
        </ProjectPickerWrapper>
    )
}
