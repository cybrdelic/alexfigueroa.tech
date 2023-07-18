import React, { createContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme, Theme } from '../theming/theme';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

export type ThemeContextType = Theme;

export const ThemeContext = createContext<ThemeContextType | undefined>(lightTheme);
export const ThemeToggleContext = createContext<(() => void) | undefined>(undefined);
