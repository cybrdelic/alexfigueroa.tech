import React, { useState } from 'react';
import { ProjectData, ProjectType, projectsData } from '../../data/project.data';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { useTheme } from '../../hooks/useTheme';
import { backgroundColor, gradientBackground, textColor } from '../../theming/util-style-functions/colors';
import ElectricButton from '../Button';
import { fontFamily, fontSize, lineHeight } from '../../theming/util-style-functions/typography';
import { margin } from '../../theming/util-style-functions/spacing';
import { absoluteCenter, fullViewport, relativeLeft } from '../../theming/util-style-functions/position';
import { GridElement } from '../ProjectsView/GridElement';
import { zIndex } from '../../theming/design-tokens';
import { flexBetween } from '../../theming/util-style-functions/layout';

interface ProjectPickerProps {
    projects: ProjectData
}
// ... other imports ...

const FullscreenCarouselWrapper = createStyledMotionComponent('div')(props => `
    ${flexBetween}
    width: 100%;
    height: 80%;
    z-index: ${zIndex.default};
`);

const CarouselSlide = createStyledMotionComponent('div')(props => `
    display: flex;
    width: 100%;
    height: 100%;
`);
const SlideLeft = createStyledMotionComponent('div')(props => `
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`);

const SlideRight = createStyledMotionComponent('div')(props => `
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 20px;  // Padding to prevent content touching the edge.
    background-color: ${props.theme.colors.background[props.theme.mode]}
    ${margin('xxl')}
`);

const CarouselControl = createStyledMotionComponent('button')(props => `
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 10;
    padding: 10px 20px;
    border-radius: 5px; // Rounded corners
    transition: background-color 0.3s;

    &.prev {
        left: 10px;
    }

    &.next {
        right: 10px;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
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

const ProjectName = createStyledMotionComponent('h1')(props => `
    color: ${props.projectColor ?? 'red'};
    ${fontSize('poster')}
    font-weight: 700;
    ${fontFamily()}
    max-width: 40rem;
    letter-spacing: 0rem;
    width: 100%;
    text-align: flex-start;
    margin-bottom: 0rem;
    padding-bottom: 0rem;
`)

const ButtonBar = createStyledMotionComponent('div')(props => `
    margin-top: 2rem;
`)

export function FullscreenCarousel(props: ProjectPickerProps) {
    const theme = useTheme()
    const projectsArray = Object.values(props.projects);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const nextProject = () => {
        setCurrentProjectIndex(prevIndex =>
            (prevIndex + 1) % projectsArray.length
        );
    };

    const prevProject = () => {
        setCurrentProjectIndex(prevIndex =>
            (prevIndex - 1 + projectsArray.length) % projectsArray.length
        );
    };

    const project = projectsArray[currentProjectIndex];

    return (
        <FullscreenCarouselWrapper>
            <CarouselSlide>
                <SlideLeft>
                    {/* This can be an image, video, or animation of the project */}
                    <GridElement isActive={true} handleMouseEnter={() => ''} handleMouseLeave={() => ''} project={project} />
                </SlideLeft>
                <SlideRight theme={theme}>
                    <ProjectName theme={theme} project={project} projectColor={project.primaryColor}>{project.name}</ProjectName>
                    <ProjectOverview theme={theme}>{project.overview}</ProjectOverview>
                    <ButtonBar>
                        <ElectricButton backgroundColor={project.primaryColor} onClick={() => console.log("Button clicked!")}>
                            Explore Project
                        </ElectricButton>
                    </ButtonBar>
                    {/* CTA Button */}

                    {/* Social Media Icons */}
                    {/* Add your social media icon components here */}
                </SlideRight>
            </CarouselSlide>
            <CarouselControl className="prev" onClick={prevProject}>Previous</CarouselControl>
            <CarouselControl className="next" onClick={nextProject}>Next</CarouselControl>
        </FullscreenCarouselWrapper>
    );
}
