import React from "react";
import { ProjectData, ProjectType } from "../../data/project.data";
import { useTheme } from "../../hooks/useTheme";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { margin, padding } from "../../theming/util-style-functions/spacing";
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
import { CheckBox } from "@mui/icons-material";

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


const StyledTitle = createStyledMotionComponent('h1')(props => `
    color: ${props?.project?.colors?.secondary ?? 'red'};
    font-family: ${props.project.title_font}, sans-serif;
    text-transform: uppercase;
    ${fontSize('largePoster')};
    margin: 0rem 0rem;
    padding: 0rem 0rem;
    text-align: left;
    flex-grow: 1;
    flex-shrink: 0;
`);



const StyledDescription = createStyledMotionComponent('p')(props => `
    $color: ${props?.project?.colors?.secondary ?? 'blue'};
    ${fontFamily(props.project.title_font)}
    ${fontSize('h6')}
    ${lineHeight('small')}
    margin-bottom: 1rem;
    text-align: justify;
`);

const FeatureList = createStyledMotionComponent('ul')(props => `
    list-style: none;
    padding: 0;
    margin-top: 1rem;
`);

const FAQList = createStyledMotionComponent('ul')(props => `
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    ${fontSize('h6')}
`);

const FAQItem = createStyledMotionComponent('li')(props => `
    color: ${props?.theme?.colors?.secondary ?? 'green'};
    margin-bottom: 0.5rem;
`);


const FeatureItem = createStyledMotionComponent('li')(props => `
    display: flex;
    align-items: center;
    color: ${props?.theme?.colors?.neon ?? 'red'};
    margin-bottom: 1rem;
    ${fontSize('h5')}
    ${fontFamily()}
`);
const ProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props?.project?.colors?.secondary ?? 'red'};
    ${fontSize('large')}
    max-width: 40rem;  // Maximum width for better readability
    text-align: justify;  // Justify the text to align on both left and right sides
    width: 100%;
    ${fontFamily(props.project.title_font)}
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

const NeonText = createStyledMotionComponent('span')(props => `
    color: ${props.theme.colors.neon}; // Neon color for cyberpunk style
    text-shadow: 0 0 10px ${props.theme.colors.neon}, 0 0 20px ${props.theme.colors.neon};
    ${fontFamily(props.project.title_font)};
    ${fontSize('poster')};
`);

const GlitchEffect = styled.div`
    position: relative;
    color: white;
    font-family: 'Orbitron', sans-serif; // Futuristic font
    text-transform: uppercase;
    overflow: hidden;

    &:after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.theme.colors.background};
        clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%, 0 50%, 100% 50%, 100% 75%, 0 75%);
        animation: glitch 1s linear infinite;
    }

    @keyframes glitch {
        0% { clip-path: inset(42% 0 41% 0); }
        5% { clip-path: inset(8% 0 44% 0); }
        10% { clip-path: inset(50% 0 49% 0); }
        15.0% { clip-path: inset(20% 0 57% 0); }
        20% { clip-path: inset(34% 0 15% 0); }
        25% { clip-path: inset(33% 0 67% 0); }
        30% { clip-path: inset(12% 0 34% 0); }
        35% { clip-path: inset(44% 0 54% 0); }
        40% { clip-path: inset(29% 0 70% 0); }
        45% { clip-path: inset(14% 0 85% 0); }
        50% { clip-path: inset(50% 0 49% 0); }
        55% { clip-path: inset(60% 0 39% 0); }
        60% { clip-path: inset(40% 0 58% 0); }
        65% { clip-path: inset(10% 0 89% 0); }
        70% { clip-path: inset(58% 0 40% 0); }
        75% { clip-path: inset(30% 0 25% 0); }
        80% { clip-path: inset(25% 0 74% 0); }
        85% { clip-path: inset(20% 0 79% 0); }
        90% { clip-path: inset(60% 0 38% 0); }
        95% { clip-path: inset(40% 0 59% 0); }
        100% { clip-path: inset(70% 0 28% 0); }
    }
`;

const ProjectWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: ${props.theme.colors.background[props.theme.mode]};
    border-radius: 10px;
    box-shadow: 0 4px 10px ${props.theme.colors.shadow};
    flex-grow: 0;
`);

const BigLeftSection = styled.div`
    display: flex;
    flex-direction: column; // Stack children vertically
    justify-content: space-between; // Space out children
    align-items: stretch; // Stretch children to fill the width
    width: 100%; // Full width
    flex-grow: 0; // Grow to fill available space
    flex-shrink: 1;

`;


const TitleSection = styled.div`
    display: flex;
    align-items: flex-start; // Align title to the top
    justify-content: flex-start; // Align title to the left
    width: 100%; // Take full width of BigLeftSection
    margin: 0rem 0rem;
    padding: 0rem 0rem;
    flex-basis: 10%;
    flex-grow: 1;
    flex-shrink: 0;
    height: 100%;
`;

const NotTitleSection = styled.div`
    display: flex;
    flex-direction: row; // Arrange Left and Center sections vertically
    width: 100%; // Ensure it takes the full width
    flex-basis: 90%;
    flex-grow: 1; // Allow to grow
    flex-shrink: 1; // Allow to shrink if needed
`;
const LeftSection = styled.div`
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    height: 100%;
    ${padding('md')};
    flex-shrink: 1;
    flex-grow: 0;
`;
const CenterSection = styled.div`
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    ${padding('md')};
    height: 100%;
    width: 100%;
`;

const RightSection = styled.div`
    flex-basis: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    ${padding('md')};
    gap: 0px;
    flex-shrink: 1;
    flex-grow: 1; // Prevent shrinking
`;

export default function ProjectPreview(props: ProjectPreviewProps) {
    const {
        isActive,
        project,
    } = props;

    const theme = useTheme();
    const cursorData = useCursorEffect();

    // Determine the animation variant based on `isActive` prop
    const selectedVariant = isActive ? animationVariants.active : animationVariants.inactive;

    const renderFeatureItem = (feature: any, index: number) => (
        <FeatureItem key={index} theme={theme}>
            <CheckBox />
            {feature}
        </FeatureItem>
    );


    return (
        <ProjectWrapper
            isActive={isActive}
            theme={theme}
            variants={selectedVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            project={project}
        >
            <BigLeftSection>
                <TitleSection>
                    <StyledTitle theme={theme} project={project}>
                        {project.branding.title}
                    </StyledTitle>
                </TitleSection>
                <NotTitleSection>
                    <LeftSection>

                        <NeonText theme={theme} project={project}>{project.branding.subtitle}</NeonText>
                        <StyledDescription theme={theme} project={project}>
                            {project.branding.brandedHook}
                        </StyledDescription>
                        <ProjectOverview theme={theme} project={project}>
                            {project.branding.detailedDescription}
                        </ProjectOverview>
                    </LeftSection>
                    <CenterSection>
                        <FeatureList theme={theme}>
                            {project.branding.features.map(renderFeatureItem)}
                        </FeatureList>

                        <FAQList theme={theme}>
                            {project.branding.faqs.map((faq, index) => (
                                <FAQItem key={index} theme={theme}>
                                    <strong>Q: {faq.question}</strong> <br /> A: {faq.answer}
                                </FAQItem>
                            ))}
                        </FAQList>
                        <Bar>
                            <ButtonBar>
                                <ElectricButton backgroundColor={project.colors.primary} onClick={() => console.log("Explore Project")}>
                                    Explore Project
                                </ElectricButton>
                                <ElectricButton backgroundColor={theme.mode === 'light' ? colors.gray.light : colors.gray.dark} onClick={() => console.log("View Demo")}>
                                    View Demo
                                </ElectricButton>
                            </ButtonBar>
                        </Bar>
                    </CenterSection>
                </NotTitleSection>
            </BigLeftSection>
            <RightSection>
                <img src="https://via.placeholder.com/150" alt="Placeholder Image 1" style={{ width: '100%' }} />
                <img src="https://via.placeholder.com/150" alt="Placeholder Image 2" style={{ width: '100%' }} />
                <img src="https://via.placeholder.com/150" alt="Placeholder Image 3" style={{ width: '100%' }} />
            </RightSection>
        </ProjectWrapper>
    );

}
