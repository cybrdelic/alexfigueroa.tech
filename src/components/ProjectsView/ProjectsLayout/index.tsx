import React, { memo, useRef, useState } from "react";
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
import VectorLogoAndText from "../VectorLogoAndText";

import { GridElement, MotionGridElement } from "../GridElement";
import { ProjectDetailsLayout } from "../ProjectDetailsPreviewLayout";
import ProjectPicker from "../ProjectPicker";
import Carousel from "../../Carousel";
import ProjectPreview from "../../ProjectPreview";
import { absoluteTopLeft, relativeTop } from "../../../theming/util-style-functions/position";
import { backgroundColor, borderColor, textColor } from "../../../theming/util-style-functions/colors";
import { Grid4x4, GridOn, ViewCarousel } from "@mui/icons-material";
import { } from "react-icons"
import { FaRegWindowMaximize as GridIcon, FaRegClone as CarouselIcon } from 'react-icons/fa';
import { colors, zIndex } from "../../../theming/design-tokens";
import { css } from "styled-components";
import { rounded } from "../../../theming/util-style-functions/misc";
import { padding } from "../../../theming/util-style-functions/spacing";
import { fontFamily, fontSize } from "../../../theming/util-style-functions/typography";
import { textCenter } from "../../../theming/util-style-functions/layout";
import ListCarouselToggleButtons from "../../ListCarouselToggleButtons";




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
    color: white;
    mix-blend-mode: difference;
    margin: 0rem 0;
    padding: 0rem;
    transition: transform 0.3s ease-in-out;

    /* Initial background setup, modified by handleMouseMove */
    background-image: radial-gradient(circle 50px at center, black, transparent);

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-clip: text;
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
    width: 100%;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`)



export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const projectsArray = Object.values(projects);
    const theme = useTheme();


    const projectCarouselPreviews: React.ReactNode[] = projectsArray.map(
        project => <ProjectPreview project={project} isActive={true} />
    );

    const projectListPreviews: React.ReactNode[] = projectsArray.map(
        project => <ProjectListItem font={project.titleFont} theme={theme}>{project.name}</ProjectListItem>
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
                                font={projectsArray[index].titleFont}
                                theme={theme}
                            >
                                {projectsArray[index].name}
                            </ProjectListItem>
                        ))}

                    </ProjectList>
                </CarouselContainer>
            ) : (
                <CarouselContainer>
                    <Carousel items={projectCarouselPreviews} />
                </CarouselContainer>
            )}
        </>
    );
}
