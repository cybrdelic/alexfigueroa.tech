import React, { memo, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
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

import { GridElement, MotionGridElement } from "../GridElement";
import { ProjectDetailsLayout } from "../ProjectDetailsPreviewLayout";
import ProjectPicker from "../ProjectPicker";
import { FullscreenCarousel } from "../../FullscreenCarousel";
import Carousel from "../../Carousel";
import ProjectPreview from "../../ProjectPreview";




interface ProjectsLayoutProps {
    projects: ProjectData;
}

const CarouselContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`)
export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const cursorType = useCursorEffect();

    const projectsArray = Object.values(projects);

    const projectPreviews: React.ReactNode[] = projectsArray.map(
        project => {
            return (
                <ProjectPreview project={project} isActive={true} />
            )
        }
    )


    return (
        <CarouselContainer>
            <Carousel items={projectPreviews} />
        </CarouselContainer>
    );
}
