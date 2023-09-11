import React from 'react';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';
import { zIndex } from '../../theming/design-tokens';

const Popover = createStyledMotionComponent('div')(props => `
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  top: 0%;
  left: 50%;
  transform: translate(-100%, -100%);
  z-index: ${zIndex.popover};
`);

const ProfilePopover: React.FC = () => {
    return (
        <Popover>
            <p>Some profile details about Alex Figueroa.</p>
            {/* Add more details or styling as needed */}
        </Popover>
    );
}

export default ProfilePopover;
