import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness3Icon from '@mui/icons-material/Brightness3'; // Moon icon
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon
import { useTheme, useToggleTheme } from '../../hooks/useTheme';
import { lightTheme } from '../../theming/theme';

const ThemeToggle = ({onClick}: {onClick: () => void}) => {
    const theme = useTheme();
    
    return (
      <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={onClick}
      >
        {theme === lightTheme ? <Brightness3Icon /> : <WbSunnyIcon />}
      </IconButton>
    );
  };
  
  export default ThemeToggle;
  