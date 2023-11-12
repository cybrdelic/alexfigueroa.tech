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
    ${fontSize('poster')};
    margin: 0rem 0rem;
    padding: 0rem 0rem;
    text-align: left;
    flex-grow: 1;
    flex-shrink: 0;
`);



const StyledDescription = createStyledMotionComponent('p')(props => `
    $color: ${props?.project?.colors?.secondary ?? 'blue'};
    ${fontFamily(props.project.title_font)}
    ${fontSize('small')}
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
    ${fontSize('small')}
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
    ${fontSize('h6')}
    ${fontFamily()}
`);
const ProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props?.project?.colors?.secondary ?? 'red'};
    ${fontSize('h6')}
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


const NeonText = createStyledMotionComponent('span')(props => `
    color: ${props.theme.colors.neon}; // Neon color for cyberpunk style
    text-shadow: 0 0 10px ${props.theme.colors.neon}, 0 0 20px ${props.theme.colors.neon};
    ${fontFamily(props.project.title_font)};
    font-size: 3.2rem;
`);


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
    justify-content: stretch;
    gap: 5%;
    flex-basis: 90%;
    flex-grow: 0; // Allow to grow
    flex-shrink: 1; // Allow to shrink if needed
`;
const LeftSection = styled.div`
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
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

const HeadlineAndSubtitle = createStyledMotionComponent('div')(props => `
    display: flex;
    padding-top: 10%;
    flex-direction: column;
    justify-content: stretch;
    width: 100%;
`)

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

                        <HeadlineAndSubtitle>
                            <NeonText theme={theme} project={project}>{project.branding.subtitle}</NeonText>
                            <StyledDescription theme={theme} project={project}>
                                {project.branding.brandedHook}
                            </StyledDescription>
                        </HeadlineAndSubtitle>
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
