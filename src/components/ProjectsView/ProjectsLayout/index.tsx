import React, { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import Carousel from "../../Carousel";
import ProjectPreview from "../../ProjectPreview";
import { zIndex } from "../../../theming/design-tokens";
import { css } from "styled-components";
import { fontFamily, fontSize } from "../../../theming/util-style-functions/typography";
import ListCarouselToggleButtons from "../../ListCarouselToggleButtons";
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



const ProjectListItem = createStyledMotionComponent('h1')(props => css`
    ${fontSize('h2')}
    ${fontFamily(props.font)}
    transform: rotateY(0deg);
    width: auto;
    color: white;
    mix-blend-mode: difference;
    margin: 0rem 0;
    padding: 1rem;
    transition: transform 0.3s ease-in-out;
`)



const ProjectList = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;  // Evenly spaced
    perspective: 1200px;
    perspective-origin: 50% 0%;
    grid-gap: 0rem;
    overflow-y: auto;
    height: 40%;
    z-index: ${zIndex.dropdown};
    padding:5% 0;  // Give some padding at top and bottom
    padding-bottom: 15%;
    left: 0%;
    width: auto;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`)



export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const projectsArray = Object.values(projects);
    const theme = useTheme();
    // Inside ProjectsLayout component

    const { activeProject, setActiveProject } = useActiveProject();

    const handleActiveProjectChange = (index: number) => {
        setActiveProject(projectsArray[index]);
    };





    const projectCarouselPreviews = projectsArray.map(project => {
        // Return the actual project data, not a component
        return project;
    });

    const projectListPreviews: React.ReactNode[] = projectsArray.map(
        project => <ProjectListItem font={project.title_font} theme={theme}>{project.branding.title}</ProjectListItem>
    )


    // State to track view mode
    const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

    return (
        <>
            <ListCarouselToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === "grid" ? (
                <CarouselContainer>
                    <ProjectList>
                        {projectListPreviews.map((preview, index) => (
                            <ProjectListItem
                                key={index}
                                font={projectsArray[index].title_font}
                                theme={theme}
                                data-id="special"
                            >
                                {projectsArray[index].branding.title}
                            </ProjectListItem>
                        ))}

                    </ProjectList>
                </CarouselContainer>
            ) : (
                <CarouselContainer backgroundColor={activeProject?.colors?.primary ?? 'blue'}>
                    <ErrorBoundary>
                        <Carousel
                            items={projectCarouselPreviews}
                            onActiveProjectChange={handleActiveProjectChange}
                        />
                    </ErrorBoundary>
                </CarouselContainer>
            )}
        </>
    );
}
