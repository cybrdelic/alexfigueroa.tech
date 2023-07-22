// ProjectPreview.tsx
import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { ProjectTitleAndLogo } from "../ProjectLogoAndText";

const ProjectWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBackground};
    padding: 2rem;
    margin-top: 1.5rem;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
`;

const ProjectOverview = styled.p`
    color: ${(props) => props.theme.text};
    margin-top: 1rem;
    line-height: 1.6;
`;

const ProjectDetailsLink = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 1.5rem;
    margin-top: 2rem;
    a {
        color: ${(props) => props.theme.primary};
        text-decoration: none;
        padding: 0.6rem 1.2rem;
        border: 1px solid ${(props) => props.theme.primary};
        border-radius: 5px;
        transition: all 0.3s ease;

        &:hover {
            background-color: ${(props) => props.theme.primary};
            color: ${(props) => props.theme.background};
        }
    }
`;

export const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme();

    if (!project) return <div>No project selected.</div>;

    return (
        <AnimatePresence>
            <ProjectWrapper
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <ProjectTitleAndLogo project={project} />
                <ProjectOverview theme={theme}>{project.overview}</ProjectOverview>
                <ProjectDetailsLink theme={theme}>
                    <motion.a
                        href={`/project/${project.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Details
                    </motion.a>
                    <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            backgroundColor: project.primaryColor
                        }}
                    >
                        View Repo
                    </motion.a>
                </ProjectDetailsLink>
            </ProjectWrapper>
        </AnimatePresence>
    );
};
