import React, { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectData, ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { motion } from "framer-motion";
import { useHoveredState } from "../../../hooks/animation/useHoveredState";
import { useAlternateTheme } from "../../../hooks/theming/useAlternateTheme";
import { adjustTransparency } from "../../../utils/adjustTransparency";
import VerticalText from "../VerticalText";
import { useCursorEffect } from "../../../hooks/useCursorEffect";
import { CursorContext } from "../../../contexts/CursorContext";
import { Link } from "react-router-dom";
import { isCloseToWhite } from "../../../utils/theming";
import VectorLogoAndText from "../VectorLogoAndText";

interface ProjectListProps {
    projects: ProjectData;
}

const StyledProjectDetailsLink = createStyledMotionComponent('div')(props => `
    text-align: center;
    padding-top: 1rem;
    margin: 1rem; // add margin to give more spacing between elements
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 3rem; // Adjust as needed
    align-items: start;
    padding: 3rem; // Increase padding
    box-sizing: border-box;
    width: 100%;
`);

const StyledFlexElement = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem; // Increase padding
    border-radius: 15px;
    background: ${adjustTransparency(props.theme.cardBackground, 0.9)};
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); // Softer shadow
    transition: box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    max-width: 200px;
    min-width: 200px;
    max-height: 200px; // Increase max height
    overflow: hidden;
    @media (min-width: 768px) {
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
    flex-direction: column; // Changed from row to column to give more space
    justify-content: center; // Adjust as needed
    align-items: center; // Adjust as needed
    height: 40rem;
    margin-left: 2rem;
    border-radius: 15px;
    min-width: 73vw;
    max-width: 73vw;
    margin-right: 2rem;
    background: ${props.theme.gradient};
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.5);
    padding: 2rem; // Add padding inside the wrapper
`);

const StyledLogo = createStyledMotionComponent('img')(props => `
    height: auto;
    max-height: 20rem;
    width: auto;
    margin-bottom: 2rem; // Increased margin-bottom
`);

const StyledTextAndLogoContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
`)

const StyledProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props.theme.text};
    margin-bottom: 2rem; // Added margin-bottom for more space between elements
`);

const hoverEffects = {
    hover: {
        scale: 1.05, // More subtle scale on hover
        transition: {
            duration: 0.3
        },
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)" // Softer shadow
    }
};

const ProjectTitleAndLogo = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme();
    if (!project) return null;

    return (
        <StyledTextAndLogoContainer>
            <StyledLogo src={project.logo} alt={project.name} effect="blur" theme={theme} />
            <VerticalText text={project.name} font={project.titleFont}></VerticalText>
        </StyledTextAndLogoContainer>
    )
}

const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme()
    if (!project) return null;

    return (
        <ProjectPreviewWrapper theme={theme}>
            <ProjectTitleAndLogo project={project} />
            <StyledProjectOverview theme={theme}>{project.overview}</StyledProjectOverview>
            <StyledProjectDetailsLink theme={theme}>
                <a href={`/project/${project.name}`} target="_blank" rel="noopener noreferrer">View Details</a>
            </StyledProjectDetailsLink>
            <StyledProjectDetailsLink theme={theme}>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">View Repo</a>
            </StyledProjectDetailsLink>
        </ProjectPreviewWrapper>
    );
}

export default function ProjectList({ projects }: ProjectListProps) {
    const theme = useTheme();
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(projects.x1dra);
    const cursorType = useCursorEffect();

    const GridElement = ({ project }: { project: ProjectType }) => {
        const { isHovered, onHoverStart, onHoverEnd } = useHoveredState();
        const theme = useTheme();

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
                    whileHover={hoverEffects.hover} // add animation on hover
                    theme={theme}
                    style={{ cursor: cursorType === 'hovered' ? 'pointer' : 'default' }}
                    data-id="special"
                >
                    <ConstantSizeWrapper>
                        <VectorLogoAndText
                            text={project.name}
                            logo={project.logo}
                            font={project.titleFont}
                            theme={theme}
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
