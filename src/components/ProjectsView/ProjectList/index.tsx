import React, { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { motion } from "framer-motion";
import { useHoveredState } from "../../../hooks/animation/useHoveredState";
import { useAlternateTheme } from "../../../hooks/theming/useAlternateTheme";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import VerticalText from "../BoldHeaderText";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { CursorContext } from "../../../contexts/CursorContext";
import { Link } from "react-router-dom";
import { isCloseToWhite } from "../../../utils/theming";
import VectorLogoAndText from "../VectorLogoAndText";
import { ProjectPreview } from "../ProjectPreview";
import { GridElement } from "../GridElement";

interface ProjectListProps {
    projects: ProjectData;
}

const ProjectPreviewPageWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`);

const StyledFlex = createStyledMotionComponent('div')(props => `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 3rem;
    align-items: start;
    padding: 3rem;
    box-sizing: border-box;
    width: 100%;
`);

const StyledContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    gap: 2rem;
`);


export default function ProjectList({ projects }: ProjectListProps) {
    const theme = useTheme();
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(projects.x1dra);
    const cursorType = useCursorEffect();

    const handleMouseEnter = (project: ProjectType) => {
        setSelectedProject(project);
    }

    const handleMouseLeave = () => {
        // You can implement any specific action on mouse leave
    }

    return (
        <CursorContext.Provider value={cursorType}>
            <ProjectPreviewPageWrapper>
                <StyledContainer>
                    <StyledFlex>
                        {Object.values(projects).map(project => (
                            <GridElement
                                key={project.id}
                                project={project}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                            />
                        ))}
                    </StyledFlex>
                    <ProjectPreview project={selectedProject} />
                </StyledContainer>
            </ProjectPreviewPageWrapper>
        </CursorContext.Provider>
    );

}
