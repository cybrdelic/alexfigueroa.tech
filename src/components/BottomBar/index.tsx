import React, { useState } from 'react';
import { styled } from 'styled-components';
import ThemeToggle from '../ThemeToggle';
import { zIndex, spacing } from '../../theming/design-tokens/spacing';
import { mq } from '../../theming/util-style-functions/responsive';
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { fontSize, fontWeight, fontFamily } from '../../theming/util-style-functions/typography';
import { textColor } from '../../theming/util-style-functions/colors';
import ProfilePopover from '../ProfilePopover';
import { useActiveProject } from '../../contexts/ActiveProjectContext';
import { projectsData } from '../../data/project.data';

const Bar = styled.div`
  z-index: ${zIndex.foreground + 10};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end; // Correct alignment

`;

const BrandTextContainer = createStyledMotionComponent('div')(props => `
  grid-gap: 0rem;
  position: relative;  // Making it relative to position the popover
  flex-basis: 15%;
  align-items: flex-end;
`)

const ActionItemContainer = createStyledMotionComponent('div')(props => `
width: 100%;
flex-basis: 70%;
`)

const ProjectNumber = createStyledMotionComponent('span')(props => `
  ${props.isActive ? fontSize('h6') : fontSize('h6')};
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  font-weight: 900;
  ${fontFamily()};
  color: ${props.isActive ? props.project.colors.secondary : 'rgba(250,250,250,0.4)'};
  // Replace 'brightColor' and 'defaultColor' with actual color values
  // Add more styles as needed
  align-self: flex-end; // Align this item to the bottom
  margin: 0; // Reset any default margins
  padding: 0; // Reset any default padding
`);

const CarouselSwitcher = createStyledMotionComponent('div')(props => `
  display: flex;
  align-items: flex-end;
  justify-content: center;
  max-height: 100%;
`);



const textSize = 'xsmall';

const Text = createStyledMotionComponent('p')(props => `
  ${fontSize(textSize)}
  ${textColor(props.theme, 'text')}
  ${fontWeight('bold')}
  ${fontFamily()}
  text-transform: uppercase;
`);

interface BottomBarProps {
  toggleTheme: () => void
}

const BottomBar: React.FC<BottomBarProps> = ({ toggleTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { activeProject, setActiveProject } = useActiveProject();
  const projects = Object.values(projectsData)
  const handlePrevClick = () => {
    // Logic for previous project
  };

  const handleNextClick = () => {
    // Logic for next project
  };

  return (
    <Bar>
      <BrandTextContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-id="special"
      >
        {isHovered && <ProfilePopover />}  {/* Display popover only if isHovered is true */}
        <Text>Alex Figueroa</Text>
        <Text>Full-Stack Software Developer</Text>
      </BrandTextContainer>
      <ActionItemContainer>
        <CarouselSwitcher>
          {projects?.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectNumber isActive={project === activeProject} project={activeProject}>
                {index + 1}
              </ProjectNumber>
            </React.Fragment>
          ))}
        </CarouselSwitcher>
      </ActionItemContainer>

      <ThemeToggle onClick={toggleTheme} />
    </Bar>
  );
}

export default BottomBar;
