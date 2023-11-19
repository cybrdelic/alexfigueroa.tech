import React, { useState } from "react";
import { ProjectData } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import Carousel from "../../Carousel";
import { css } from "styled-components";
import { ErrorBoundary } from "../../ErrorBoundary";
import { useActiveProject } from "../../../contexts/ActiveProjectContext";

interface ProjectsLayoutProps {
    projects: ProjectData;
}

const CarouselContainer = createStyledMotionComponent('div')(props => css`
    display: flex;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`);


export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const projectsArray = Object.values(projects);

    const { activeProject, setActiveProject } = useActiveProject();

    const handleActiveProjectChange = (index: number) => {
        setActiveProject(projectsArray[index]);
    };

    const projectCarouselPreviews = projectsArray.map(project => {
        // Return the actual project data, not a component
        return project;
    });


    return (
        <CarouselContainer backgroundColor={activeProject?.colors?.primary ?? 'blue'}>
            <ErrorBoundary>
                <Carousel
                    items={projectCarouselPreviews}
                    onActiveProjectChange={handleActiveProjectChange}
                />
            </ErrorBoundary>
        </CarouselContainer>
    )
}
