import React, { useCallback, useState } from "react";
import { ProjectData, ProjectType } from "../../data/project.data";
import { useTheme } from "../../hooks/useTheme";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { margin, padding } from "../../theming/util-style-functions/spacing";
import { GridElement } from "../ProjectsView/GridElement";
import { fontFamily, fontSize, letterSpacing, lineHeight } from "../../theming/util-style-functions/typography";
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
    activeIndex: number;
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
    ${fontFamily(props.project.title_font)};
    ${letterSpacing('wider')};
    font-weight: 200;
    text-transform: uppercase;
    ${fontSize('large')};
    margin: 0rem 0rem;
    padding: 0rem 0rem;
    text-align: left;
`);

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // Space between badges
  margin-top: 1rem; // Adjust as needed
`;



const StyledDescription = createStyledMotionComponent('p')(props => `
    color: ${props.project.colors.secondary};
    ${fontFamily()}
    ${fontSize('small')}
    ${lineHeight('small')};
    ${letterSpacing('wider')};
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    text-align: justify;
    font-weight: 300;
`);

const FeatureList = createStyledMotionComponent('ul')(props => `
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
`);


const FAQSection = styled.section`
    margin-top: 2rem;
    padding: 1rem;
    margin-bottom: 0rem;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.dark.dark};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
`;

const FAQHeader = styled.h2`
    color: ${props => props.theme.colors.common.white};
    text-shadow: 0 0 10px ${props => props.theme.colors.neon};
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 1rem;
    text-transform: uppercase;
`;

const FAQList = createStyledMotionComponent('ul')(props => `
    list-style: none;
    padding: 0;
    ${fontSize('small')}
    color: ${props.theme.colors.secondary};
`);

const FAQItem = createStyledMotionComponent('li')(props => `
    color: ${props.project.colors.secondary};
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid ${props.theme.colors.neon};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props.theme.colors.backgroundLight};
        box-shadow: 0 0 10px ${props.theme.colors.neon};
    }

    & strong {
        display: block;
        color: ${props.theme.colors.primary};
        margin-bottom: 0.5rem;
    }
`);



const FeatureItem = createStyledMotionComponent('li')(props => `
    display: flex;
    align-items: center;
    color: ${props.theme.colors.neon};
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: ${props.theme.colors.dark};
    border-radius: 5px;
    box-shadow: 0 0 10px ${props.theme.colors.neon};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props.theme.colors.backgroundLight};
        box-shadow: 0 0 15px ${props.theme.colors.neon};
    }

    ${fontSize('h6')}
    ${fontFamily('Orbitron')}

    &::before {
        content: '';
        display: inline-block;
        background-image: url('checkbox-icon-path'); // replace with your checkbox icon path
        background-size: contain;
        background-repeat: no-repeat;
        height: 1rem;
        width: 1rem;
        margin-right: 10px;
    }

    cursor: pointer;

    &:hover, &:focus {
        // hover and focus styles
    }
`);

const ProjectOverview = createStyledMotionComponent('p')(props => `
    color: ${props?.theme?.colors?.common.white ?? 'red'};
    ${fontSize('small')}
    text-align: justify;  // Justify the text to align on both left and right sides
    width: 100%;
    max-height: 100%;
    ${fontFamily()}
    ${lineHeight('base')};
`)


const Bar = createStyledMotionComponent('div')(props => `
    width: 100%;
    ${flexBetween}
`)

const ButtonBar = createStyledMotionComponent('div')(props => `
    grid-gap: 2rem;
    ${flexStart};
    padding-bottom: 1rem;
`)


const NeonText = createStyledMotionComponent('span')(props => `
    color: ${props.theme.colors.common.white}; // Neon color for cyberpunk style
    text-shadow: 0 0 10px ${props.theme.colors.neon}, 0 0 20px ${props.theme.colors.neon};
    ${fontFamily()};
    font-size: 4.5rem;
    font-weight: 900;
    ${letterSpacing('normal')};
    ${lineHeight('heading')};
`);


const ProjectWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 10px;
    box-shadow: 0 4px 10px ${props.theme.colors.shadow};
`);

const BigLeftSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1; // Take up remaining space
    margin-right: 5rem; // Adjust as needed to align with RightSection
`;


const TitleSection = styled.div`
    display: flex;
    align-items: flex-start; // Align title to the top
    justify-content: flex-start; // Align title to the left
    width: 100%; // Take full width of BigLeftSection
    margin: 0rem 0rem;
    padding: 0rem 0rem;
    flex-basis: 10%;
    flex-grow: 0;
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
    justify-content: space-between;
    align-items: left;
    flex-grow: 0;
`;
const ScrollableSection = createStyledMotionComponent('div')(props => `
    display: flex;
    flex-direction: column;
    justify-content: space-between; // Align content to start
    align-items: flex-start;
    padding: 1rem; // Unified padding
    max-height: 30rem;
    width: 60%;
    overflow-y: auto; // Enable vertical scrolling
    overflow-x: hidden; // Hide horizontal scrollbar
    scrollbar-width: thin; // For Firefox
    scrollbar-color: ${props.theme.colors.neon} ${props.theme.colors.background}; // Custom scrollbar colors

    &::-webkit-scrollbar {
        width: 10px; // A bit wider for a bolder look
        background-color: ${props.theme.colors.dark.dark}; // Dark background for contrast
    }

    &::-webkit-scrollbar-track {
        background: ${props.theme.colors.background};
        box-shadow: inset 0 0 10px 10px ${props.theme.colors.dark.dark};
        border-left: 10px solid ${props.theme.colors.neon}; // Neon border for a sharp look
        width: 20px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props.project.colors.secondary}; // Neon color for thumb
        border-radius: 6px; // Slightly more rounded
        border: 30px solid ${props.theme.colors.dark.dark}; // Dark border for contrast
        box-shadow: 0 0 10px ${props.theme.colors.neon}; // Glowing effect
        &:hover {
            background-color: ${props.theme.colors.neon}; // Brighter color on hover
            box-shadow: 0 0 15px ${props.theme.colors.neon}; // Stronger glow on hover
        }
    }

`);


const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #121212;
    color: ${props => props.theme.colors.neon};
    border-left: 3px solid ${props => props.theme.colors.neon};
    height: 100%;
    width: 100%;
    box-shadow: inset 0 0 10px ${props => props.theme.colors.neon};

    img {
        border: 3px solid ${props => props.theme.colors.neon};
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px ${props => props.theme.colors.neon};
        }
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.neon};
        border-radius: 10px;
    }
`;


const HeadlineAndSubtitle = createStyledMotionComponent('div')(props => `
    display: flex;
    padding-top: 10%;
    flex-direction: column;
    justify-content: stretch;
    width: 100%;
`)

const FeaturesHeader = styled.h2`
    color: ${props => props.theme.colors.neon};
    text-shadow: 0 0 10px ${props => props.theme.colors.neon};
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-bottom: 2px solid ${props => props.theme.colors.neon};
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Tooltip = styled.span`
    visibility: hidden;
    width: 120px;
    background-color: ${props => props.theme.colors.neon};
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${props => props.theme.colors.neon} transparent transparent transparent;
    }

    ${FeatureItem}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

const FeatureItemComponent = React.memo(({ feature, theme, isOpen, onToggle }) => (
    <FeatureItem theme={theme} onClick={() => onToggle(feature.id)}>
        {feature.title}
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <p>{feature.description}</p>
                {/* Additional content like images or links can be added here */}
            </motion.div>
        )}
    </FeatureItem>
));



export default function ProjectPreview(props: ProjectPreviewProps) {
    const {
        isActive,
        project,
        activeIndex
    } = props;

    const theme = useTheme();
    const cursorData = useCursorEffect();

    // Determine the animation variant based on `isActive` prop
    const selectedVariant = isActive ? animationVariants.active : animationVariants.inactive;
    const [openFeatureId, setOpenFeatureId] = useState(null);

    const handleToggleFeature = useCallback((id) => {
        setOpenFeatureId(openFeatureId === id ? null : id);
    }, [openFeatureId]);



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
                <NotTitleSection>
                    <LeftSection>
                        <StyledTitle theme={theme} project={project}>
                            {activeIndex + 1}. {project.branding.title}
                            <BadgeContainer>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* GitHub Repo Badge */}
                                    <a href="https://github.com/alexfigueroa-solutions/TraceMate" target="_blank" rel="noopener noreferrer">
                                        <img src="https://img.shields.io/github/stars/TraceMate?style=flat-square&logo=github&color=black" alt="GitHub Repo" />
                                    </a>

                                    {/* PyPI Version Badge */}
                                    <a href="https://pypi.org/project/TraceMate/" target="_blank" rel="noopener noreferrer">
                                        <img src="https://img.shields.io/pypi/v/TraceMate?style=flat-square&logo=pypi&logoColor=white&color=black" alt="PyPI Version" />
                                    </a>

                                    {/* PyPI Downloads Badge */}
                                    <a href="https://pypi.org/project/your-package/" target="_blank" rel="noopener noreferrer">
                                        <img src="https://img.shields.io/pypi/dm/your-package?style=flat-square&logo=pypi&logoColor=white&color=black" alt="PyPI Downloads" />
                                    </a>
                                </div>


                            </BadgeContainer>
                        </StyledTitle>

                        <HeadlineAndSubtitle>
                            <NeonText theme={theme} project={project}>{project.branding.subtitle}</NeonText>
                            <StyledDescription theme={theme} project={project}>
                                {project.branding.brandedHook}
                            </StyledDescription>
                        </HeadlineAndSubtitle>
                        <Bar>
                            <ButtonBar>
                                <ElectricButton backgroundColor={project.colors.secondary} onClick={() => console.log("Explore Project")}>
                                    Explore Project
                                </ElectricButton>
                                <ElectricButton backgroundColor={'rgba(250,250,250,0.2)'} onClick={() => console.log("View Demo")}>
                                    View Demo
                                </ElectricButton>
                            </ButtonBar>
                        </Bar>
                        <ProjectOverview theme={theme} project={project}>
                            {project.branding.detailedDescription}
                        </ProjectOverview>
                    </LeftSection>
                    <ScrollableSection project={project} theme={theme}>
                        <FeaturesHeader theme={theme}>
                            Features
                            {/* You can add an interactive icon or button next to the header if needed */}
                        </FeaturesHeader>
                        <FeatureList theme={theme}>
                            {project.branding.features.map((feature) => (
                                <FeatureItemComponent
                                    key={feature.id}
                                    feature={feature}
                                    isOpen={openFeatureId === feature.id}
                                    onToggle={handleToggleFeature}
                                    theme={theme}
                                />
                            ))}
                        </FeatureList>
                        <RightSection>
                            <img src="https://www.electronics-lab.com/wp-content/uploads/2018/09/nexmo-cli-installed.jpg" alt="Placeholder Image 1" style={{ width: '100%' }} />
                            <img src="https://th.bing.com/th/id/OIP.cJ2ELTiATcCdCr13_B6kYgHaFj?pid=ImgDet&rs=1" alt="Placeholder Image 2" style={{ width: '100%' }} />
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20190502161414/Screenshot-from-2019-05-02-16-04-50.png" alt="Placeholder Image 3" style={{ width: '100%' }} />
                        </RightSection>
                        <FAQSection theme={theme}>
                            <FAQHeader theme={theme}>Frequently Asked Questions</FAQHeader>
                            <FAQList theme={theme}>
                                {project.branding.faqs.map((faq, index) => (
                                    <FAQItem project={project} key={index} theme={theme}>
                                        <strong>Q: {faq.question}</strong>
                                        <span>A: {faq.answer}</span>
                                    </FAQItem>
                                ))}
                            </FAQList>
                        </FAQSection>
                    </ScrollableSection>


                </NotTitleSection>
            </BigLeftSection>
        </ProjectWrapper>
    );

}
