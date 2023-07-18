import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { ProjectData, ProjectType } from "../../data/project.data";
import { createStyledMotionComponent } from "../../utils/createStyledMotionComponent";
import VectorLogoAndText from "../VectorLogoAndText";
import { motion } from "framer-motion";
import { useHoveredState } from "../../hooks/animation/useHoveredState";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import { adjustTransparency } from "../../utils/adjustTransparency";
import VerticalText from "../VerticalText";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { CursorContext } from "../../contexts/CursorContext";
import { Link } from "react-router-dom";
import { isCloseToWhite } from "../../utils/theming";

interface ProjectListProps {
    projects: ProjectData;
}

const StyledProjectDetailsLink = createStyledMotionComponent('div')(props => `
    text-align: center;
    padding-top: 1rem;
    a {
        color: ${props.theme.text};
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid ${props.theme.text};
        border-radius: 5px;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        &:hover {
            background-color: ${props.theme.text};
            color: ${props.theme.background};
        }
    }
`);
const ProjectPreviewPageWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`);
const StyledFlex = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    gap: 2rem;
`);

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 15px;
    background: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    width: 200px;
    min-height: 200px;
    max-height: 250px;
    overflow: hidden;
    @media (min-width: 768px) {
        min-height: 200px;
    }
`);


const StyledContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    gap: 2rem; // Adjust as needed
`);

const ConstantSizeWrapper = createStyledMotionComponent('div')(props => `
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;  // Ensure the content doesn't overflow the wrapper
`);

const ProjectPreviewWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 40rem;
    margin-left: 2rem;
    border-radius: 15px;
    min-width: 73vw;
    max-width: 73vw;
    margin-right: 2rem;
    background: ${props.theme.gradient};
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.5);
`);

const StyledLogo = createStyledMotionComponent('img')(props => `
    height: auto;
    max-height: 20rem;
    width: auto;
    margin-bottom: 0.5rem;
`);

const StyledProjectPreviewContainer = createStyledMotionComponent('div')(props => `
    display: flex;
`);

const StyledProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props.theme.text};
`);



const hoverEffects = {
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3
        },
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.5)"
    }
};


const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
    const theme = useAlternateTheme()
    if (!project) return null;

    return (
        <ProjectPreviewWrapper theme={theme}>
            <StyledProjectPreviewContainer theme={theme}>
                <StyledLogo src={project.logo} alt={project.name} theme={theme} />
                <StyledProjectOverview theme={theme}>{project.overview}</StyledProjectOverview>
                <StyledProjectDetailsLink theme={theme}>
                    <Link to={`/project/${project.id}`}>View Details</Link>
                </StyledProjectDetailsLink>
            </StyledProjectPreviewContainer>
        </ProjectPreviewWrapper>
    );
}

export default function ProjectList({ projects }: ProjectListProps) {
    const theme = useTheme();
    const alternateTheme = useAlternateTheme();
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(projects.x1dra);
    const cursorType = useCursorEffect();

    const GridElement = ({ project }: { project: ProjectType }) => {
        const { isHovered, onHoverStart, onHoverEnd } = useHoveredState();
        const theme = useTheme();
        const alternateTheme = useAlternateTheme();

        let backgroundTheme = selectedProject === project ? alternateTheme : theme;

        const handleMouseEnter = () => {
            onHoverStart();
            setSelectedProject(project);
        }

        const handleMouseLeave = () => {
            onHoverEnd();
        }

        return (
            <CursorContext.Provider value={cursorType}>
                <StyledFlexElement
                    isHovered={isHovered}
                    key={project.id}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    whileHover={hoverEffects.hover}
                    theme={backgroundTheme}
                    style={{ cursor: cursorType === 'hovered' ? 'pointer' : 'default' }}
                    data-id="special"
                >
                    <ConstantSizeWrapper>
                        <VectorLogoAndText
                            text={project.name}
                            logo={project.logo}
                            font={project.titleFont}
                            theme={backgroundTheme}
                            data-id="special"
                        />
                    </ConstantSizeWrapper>
                </StyledFlexElement>
            </CursorContext.Provider>
        );
    }



    return (
        <CursorContext.Provider value={cursorType}>
            <ProjectPreviewPageWrapper>
                <VerticalText font={selectedProject?.titleFont ?? 'Roboto'} text={selectedProject?.name ?? 'blank'} />
                <StyledContainer>
                    <StyledFlex>
                        {Object.values(projects).map(project => (
                            <GridElement key={project.id} project={project} />
                        ))}
                    </StyledFlex>
                    <ProjectPreview project={selectedProject} />
                </StyledContainer>
            </ProjectPreviewPageWrapper>
        </CursorContext.Provider>
    );

}
