import React, { memo, useEffect, useState } from "react";
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
interface ProjectsLayoutProps {
    projects: ProjectData;
}


const StyledFlex = createStyledMotionComponent(motion.div)(props => `
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


const StyledContainer = createStyledMotionComponent(motion.div)(props => `
    display: flex;
    flex-direction: column;
    gap: 1rem;

`);

const GridElementContainer = createStyledMotionComponent(motion.div)(props => `
    display: flex;
    padding: 2rem;

`)

const MemoizedGridElement = memo(GridElement);

export default function ProjectsLayout({ projects }: ProjectsLayoutProps) {
    const theme = useTheme();
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(projects.x1dra);
    const [animateProjectDetails, setAnimateProjectDetails] = useState<"open" | "closed">("closed");
    const [hoveredProject, setHoveredProject] = useState<ProjectType | null>(null);


    const cursorType = useCursorEffect();

    const handleMouseEnter = (project: ProjectType) => {
        setHoveredProject(project);
    }

    useEffect(() => {
        if (hoveredProject) {
            setAnimateProjectDetails("closed");
            setSelectedProject(null);

            requestAnimationFrame(() => {
                setSelectedProject(hoveredProject);
                setAnimateProjectDetails("open");
            });
        }
    }, [hoveredProject]);

    return (
        <CursorContext.Provider value={cursorType}>
            <StyledContainer
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <StyledFlex variants={listVariants}>
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
                                handleMouseLeave={() => { }}
                            />
                        </GridElementContainer>
                    ))}
                </StyledFlex>
                {selectedProject && (
                    <ProjectDetailsLayout
                        project={selectedProject}
                        animate={animateProjectDetails}
                    />
                )}
            </StyledContainer>
        </CursorContext.Provider>
    );
}
