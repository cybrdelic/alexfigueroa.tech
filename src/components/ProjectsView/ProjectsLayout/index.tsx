import React, { memo, useState } from "react";
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
import { GridElement, MotionGridElement } from "../GridElement";
import { ProjectDetailsLayout } from "../ProjectDetailsPreviewLayout";
import ProjectPicker from "../ProjectPicker";

// animation variants
const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};


interface ProjectsLayoutProps {
    projects: ProjectData;
}


const StyledContainer = createStyledMotionComponent(motion.div)(props => `
    display: flex;
    flex-direction: column;
    gap: 1rem;
`);


export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const cursorType = useCursorEffect();


    return (
        <CursorContext.Provider value={cursorType}>
            <StyledContainer
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <ProjectPicker
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    projects={projects}
                />

                {selectedProject && (
                    <ProjectDetailsLayout
                        project={selectedProject}
                        animate={selectedProject ? "open" : "closed"}
                    />
                )}
            </StyledContainer>
        </CursorContext.Provider>
    );
}
