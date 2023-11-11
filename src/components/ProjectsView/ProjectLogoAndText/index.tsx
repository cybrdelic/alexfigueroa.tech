import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { createStyledMotionComponent } from "../../../theming/styled-motion-utils/createStyledMotionComponent";
import BoldHeaderText from "../BoldHeaderText";
import { ProjectType } from "../../../data/project.data";


const StyledTextAndLogoContainer = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
`)

const StyledLogo = createStyledMotionComponent('img')(props => `
    height: auto;
    max-height: 20rem;
    width: auto;
    margin-bottom: 2rem; // Increased margin-bottom
`);

export const ProjectTitleAndLogo = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme();
    if (!project) return null;

    return (
        <StyledTextAndLogoContainer>
            {/* <StyledLogo src={project.logo} alt={project.name} effect="blur" theme={theme} /> */}
            <BoldHeaderText text={project.branding.title} font={project.title_font} />
        </StyledTextAndLogoContainer>
    )
}
