// Import necessary libraries
import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { ProjectKey, ProjectType, projectsData } from '../../data/project.data';
import { useActiveProject } from '../../contexts/ActiveProjectContext';
import { useSetDynamicBackground } from '../../hooks/useTheme';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import Spline from '@splinetool/react-spline';

const fetchSectionImages = () => {
    return Object.keys(projectsData).reduce((acc, projectKey) => {
        const project = projectsData[projectKey as ProjectKey];
        acc[projectKey] = project.image_url; // Assuming there is an image_url field in your project data
        return acc;
    }, {} as { [key in ProjectKey]: string });
};

const sectionImages = fetchSectionImages();

// Global styles


// Styled components
const HeroSection = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Cursor = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  z-index: 9999;
`;

const ImageWrap = styled(motion.div)`
  width: 80%;
  max-width: 1200px;
  overflow: hidden;
  min-height: 50vh;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.02);
`;

const SlideButton = styled(motion.li)`
  font-size: 4rem;
  line-height: 4rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 900;
  -webkit-text-stroke: 2px white;
  text-stroke: 2px white;
  mix-blend-mode: difference; // This will invert the color against the background
  opacity: 0.3;
  transition: opacity 0.3s ease, mix-blend-mode 0.3s ease;

  &.active {
    opacity: 1;
    mix-blend-mode: normal; // Keep the color normal for active element if needed
  }

  &:hover {
    mix-blend-mode: normal; // Remove inversion on hover if needed
  }
`;

const SlideButtonList = styled.ul`
  list-style: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 2rem;
  z-index: 2; // Ensure it's above the image background
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 70vh;
`;

const SlideButtonListScrollContainer = createStyledMotionComponent('div')(props => css`

  background-color: blue;
  min-width: 100vw;
  padding: 10rem;
`)

const SideText = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 6vw;
  line-height: 1;
  font-weight: 900;
  color: rgba(255,255,255,0.05);
  writing-mode: vertical-rl;
  text-orientation: mixed;
`;

// Main component
const PageSwitcher = () => {
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const controls = useAnimation();
    const splineRef = useRef(null);
    const { activeProject, setActiveProject } = useActiveProject()

    useEffect(() => {
        if (splineRef.current) {
            switch (activeProject?.branding?.title) {
                case 'WorkspaceAutomator':
                    splineRef?.current?.play('WorkspaceAutomatorAnimation');
                    break;
                // ... other cases for different projects
            }
        }
    }, [activeProject]);


    // Assuming `activeProject` should hold a key of the project, not the project object itself.
    const [carouselScrolledToEnd, setCarouselScrolledToEnd] = useState(false);
    // ... other states and hooks

    // Function to lock the main page scroll
    const lockMainScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    // Function to unlock the main page scroll
    const unlockMainScroll = () => {
        document.body.style.overflow = 'visible';
    };

    // Effect to add and remove event listeners
    useEffect(() => {
        const handleScroll = (e) => {
            // Check if the carousel has been scrolled to the end
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
                setCarouselScrolledToEnd(true);
                unlockMainScroll();
            }
        };

        const listElement = document.getElementById('slide-button-list');
        listElement.addEventListener('scroll', handleScroll);

        return () => {
            listElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // When the carousel is focused, lock the main scroll
    const handleCarouselFocus = () => {
        lockMainScroll();
    };

    // When the carousel loses focus or if it's scrolled to the end, unlock the main scroll
    const handleCarouselBlur = () => {
        if (carouselScrolledToEnd) {
            unlockMainScroll();
        }
    };
    const setDynamicBackground = useSetDynamicBackground()

    useEffect(() => {
        const updateCursorPos = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateCursorPos);
        return () => window.removeEventListener('mousemove', updateCursorPos);
    }, []);

    const handleProjectClick = (project: ProjectType) => {
        setActiveProject(project);
        setDynamicBackground(project?.colors?.primary);
    };



    return (
        <>
            <HeroSection
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <SideText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {activeProject?.branding?.subtitle}
                </SideText>
                <ImageWrap
                    initial={{ scale: 1.03 }}
                    animate={controls}
                    transition={{ duration: 0.5 }}
                    style={{}} // Use the secondary color
                >
                    <Spline
                        ref={splineRef}
                        scene="https://prod.spline.design/V1sMeeITKclNo7QY/scene.splinecode" />
                </ImageWrap>
                <SlideButtonList id="slide-button-list"
                    onFocus={handleCarouselFocus}
                    onBlur={handleCarouselBlur}>
                    {Object.entries(projectsData).map(([key, project]) => (
                        <SlideButton
                            key={key}
                            className={activeProject === project ? 'active' : ''}
                            onMouseEnter={() => controls.start({ scale: 1.1 })}
                            onMouseLeave={() => controls.start({ scale: 1 })}
                            // Pass a function that will call handleProjectClick with the correct key when clicked
                            onClick={() => handleProjectClick(project)}
                        >
                            {project.branding.title}
                        </SlideButton>
                    ))}
                </SlideButtonList>

            </HeroSection>
        </>
    );
};

export default PageSwitcher;
