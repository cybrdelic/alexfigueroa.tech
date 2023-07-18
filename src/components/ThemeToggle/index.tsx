import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Brightness3Icon from '@mui/icons-material/Brightness3'; // Moon icon
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon
import { useTheme, useToggleTheme } from '../../hooks/useTheme';
import { lightTheme } from '../../theming/theme';
import { createStyledMotionComponent } from '../../utils/createStyledMotionComponent';

const StyledIconButton = createStyledMotionComponent(IconButton)(props => `
    position: fixed;
    bottom: 20px;
    right: 20px;
`);

const ThemeToggle = ({ onClick }: { onClick: () => void }) => {
    const theme = useTheme();

    return (
        <StyledIconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={onClick}
        >
            {theme === lightTheme
                ? <Brightness3Icon fontSize="large" />
                : <WbSunnyIcon fontSize="large" />}
        </StyledIconButton>
    );
};

export default ThemeToggle;
