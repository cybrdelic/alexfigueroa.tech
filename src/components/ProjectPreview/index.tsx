import React from "react";
import { ProjectData, ProjectType } from "../../data/project.data";
import { useTheme } from "../../hooks/useTheme";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { margin } from "../../theming/util-style-functions/spacing";
import { GridElement } from "../ProjectsView/GridElement";
import { fontFamily, fontSize, lineHeight } from "../../theming/util-style-functions/typography";
import { textColor } from "../../theming/util-style-functions/colors";
import { flexBetween, flexStart } from "../../theming/util-style-functions/layout";
import SocialMediaIcons from "../SocialMediaIcons";
import { colors } from "../../theming/design-tokens/colors";
import { zIndex } from "../../theming/design-tokens";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";
import ElectricButton from "../Button/ElectricButton";
import { useCursorEffect } from "../../hooks/useCursorEffect";

interface ProjectPreviewProps {
    project: ProjectType;
    isActive: boolean;
}
const animationVariants = {
    active: {
        hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } }
    },
    inactive: {
        hidden: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        visible: { opacity: 0.7, scale: 0.95, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } }
    }
};



const Project3DWrapper = createStyledMotionComponent('div')(props => `
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    ${zIndex.foreground}
`);

const SlideLeft = createStyledMotionComponent('div')(props => `
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`);

const SlideRight = createStyledMotionComponent('div')(props => `
    flex-basis: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;  // Padding to prevent content touching the edge.
    background-color: ${props.theme.colors.background[props.theme.mode]}
    ${margin('xxl')}
`);


const ProjectStatus = createStyledMotionComponent('span')(props => `
    font-size: 0.8rem;
    color: ${props.theme.colors.success};  // Can vary based on status.
`);

const ProjectOverview = createStyledMotionComponent('p')(props => `
    ${textColor(props.theme, 'text')}
    ${fontSize('large')}
    max-width: 40rem;  // Maximum width for better readability
    text-align: justify;  // Justify the text to align on both left and right sides
    width: 100%;
    ${fontFamily()}
    ${lineHeight('base')};
`)


const Bar = createStyledMotionComponent('div')(props => `
    margin-top: 2rem;
    width: 100%;
    ${flexBetween}
`)

const ButtonBar = createStyledMotionComponent('div')(props => `
    grid-gap: 2rem;
    ${flexStart}
`)

const ProjectCategory = createStyledMotionComponent('span')(props => `
    background-color: ${props.theme.colors.primary};
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    text-transform: uppercase;
`);


export default function ProjectPreview(props: ProjectPreviewProps) {
    const {
        isActive,
        project,
    } = props;

    const theme = useTheme();
    const cursorData = useCursorEffect();

    // Determine the animation variant based on `isActive` prop
    const selectedVariant = isActive ? animationVariants.active : animationVariants.inactive;

    return (
        <Project3DWrapper
            isActive={isActive}
            theme={theme}
            key={project.id}
            as={motion.div}
            variants={selectedVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
            <SlideRight theme={theme}>

                <ProjectCategory theme={theme}>{project.branding.subtitle}</ProjectCategory>  {/* Assuming 'type' is a property on the project */}
                {/* <ProjectDuration theme={theme}>Duration: {project.branding} months</ProjectDuration> Assuming 'duration' is a property on the project */}
                {/* <ProjectStatus theme={theme}>Status: {project}</ProjectStatus> Assuming 'status' is a property on the project */}
                <ProjectOverview theme={theme}>{project.branding.brandedHook}</ProjectOverview>
                <Bar>
                    <ButtonBar>
                        <ElectricButton data-id="special" backgroundColor={project.colors.primary} onClick={() => console.log("Button clicked!")}>
                            Explore Project
                        </ElectricButton>
                        <ElectricButton backgroundColor={theme.mode === 'light' ? colors.gray.light : colors.gray.dark} onClick={() => console.log("Button clicked!")}>
                            View Demo
                        </ElectricButton>
                    </ButtonBar>

                </Bar>
            </SlideRight>
        </Project3DWrapper>
    )
}
