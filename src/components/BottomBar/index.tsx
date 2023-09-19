import React, { useState } from 'react';
import { styled } from 'styled-components';
import ThemeToggle from '../ThemeToggle';
import { zIndex, spacing } from '../../theming/design-tokens/spacing';
import { mq } from '../../theming/util-style-functions/responsive';
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { fontSize, fontWeight, fontFamily } from '../../theming/util-style-functions/typography';
import { textColor } from '../../theming/util-style-functions/colors';
import ProfilePopover from '../ProfilePopover';

const Bar = styled.div`
  z-index: ${zIndex.foreground + 10};
  height: 10%;
  min-height: 10%;
  max-height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${mq('md')} {
    bottom: ${spacing.md};
    right: ${spacing.md};
  }
`;

const BrandTextContainer = createStyledMotionComponent('div')(props => `
  grid-gap: 0rem;
  position: relative;  // Making it relative to position the popover
`)

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
      <ThemeToggle onClick={toggleTheme} />
    </Bar>
  );
}

export default BottomBar;
