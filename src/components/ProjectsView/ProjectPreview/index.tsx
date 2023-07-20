import React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "../../../hooks/useTheme";
import { ProjectType } from "../../../data/project.data";
import { ProjectTitleAndLogo } from "../ProjectLogoAndText";
import { createStyledMotionComponent } from "../../../utils/createStyledMotionComponent";
import Tilt from 'react-parallax-tilt';

const ProjectPreviewWrapper = createStyledMotionComponent(motion.div)(props => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(4px);
    border: 2rem solid ${props.theme.text}
    background: rgba(0,0,0, 0.1);
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

const MotionAnchor = createStyledMotionComponent(motion.a)(props => `
    color: ${props.theme.text};
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        background-color: ${props.theme.text};
        color: ${props.theme.background};
    }

    @media (max-width: 768px) {
        margin-bottom: 0.5rem;
    }
`);

// Tilt effect
const tiltMotion = {
    hover: {
        rotateX: [0, -20, 20, -20, 0],
        rotateY: [0, 20, -20, 20, 0],
        transition: { delay: 0.2 }
    }
};
export const ProjectPreview = ({ project }: { project: ProjectType | null }) => {
    const theme = useTheme();

    // For parallax tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    if (!project) return <div>No project selected.</div>;

    return (
        <AnimatePresence mode="wait">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <ProjectPreviewWrapper
                    initial="hidden"
                    animate="show"
                    theme={theme}
                >
                    <ProjectTitleAndLogo project={project} />
                    <StyledProjectOverview theme={theme}>{project.overview}</StyledProjectOverview>
                    <StyledProjectDetailsLink theme={theme}>
                        <MotionAnchor
                            href={`/project/${project.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            data-id="special"
                        >
                            View Details
                        </MotionAnchor>
                        <MotionAnchor
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                backgroundColor: project.primaryColor
                            }}
                            data-id="special"
                        >
                            View Repo
                        </MotionAnchor>
                    </StyledProjectDetailsLink>
                </ProjectPreviewWrapper>
            </Tilt>
        </AnimatePresence>
    );
};
