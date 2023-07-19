import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import { ProjectTitleAndLogo } from "../ProjectLogoAndText";

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

const StyledProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props.theme.text};
    margin-bottom: 2rem; // Added margin-bottom for more space between elements
`);

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

export const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
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
