import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { ProjectTitleAndLogo } from "../ProjectLogoAndText";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";

const ProjectPreviewWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40rem;
    margin: 2rem;
    border-radius: 15px;
    width: 73vw;
    background: ${props.theme.gradient};
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.5);
    padding: 2rem;

    @media (max-width: 768px) {
        width: 90vw;
    }
`);

const StyledProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props.theme.text};
    margin-bottom: 2rem;
`);

const StyledProjectDetailsLink = createStyledMotionComponent('div')(props => `
    display: flex;
    justify-content: flex-end;
    grid-gap: 2rem;
    padding-top: 1rem;
    margin: 1rem;
    width: 100%;
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

        @media (max-width: 768px) {
            margin-bottom: 0.5rem;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`);

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
};

export const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme();

    if (!project) return <div>No project selected.</div>;

    return (
        <AnimatePresence mode="wait">
            <ProjectPreviewWrapper initial="hidden" animate="show" variants={fadeIn} theme={theme}>
                <ProjectTitleAndLogo project={project} />
                <StyledProjectOverview theme={theme}>{project.overview}</StyledProjectOverview>
                <StyledProjectDetailsLink theme={theme}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <a href={`/project/${project.name}`} target="_blank" rel="noopener noreferrer">View Details</a>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{
                        backgroundColor: project.primaryColor
                    }}>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">View Repo</a>
                    </motion.div>
                </StyledProjectDetailsLink>
            </ProjectPreviewWrapper>
        </AnimatePresence>
    );
};
