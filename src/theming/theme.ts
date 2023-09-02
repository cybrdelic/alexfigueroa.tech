import * as tokens from "./design-tokens";

// Extracting the color properties to its own interface for clarity
export interface ThemeColors {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    gray: string;
    text: string;
    background: string;
}

export interface Theme {
    typography: typeof tokens.typography;
    transitions: typeof tokens.transitions;
    spacing: typeof tokens.spacing;
    zIndex: typeof tokens.zIndex;
    breakpoints: typeof tokens.breakpoints;
    boxShadow: typeof tokens.boxShadow;
    colors: ThemeColors;
}

const common = {
    typography: tokens.typography,
    transitions: tokens.transitions,
    spacing: tokens.spacing,
    zIndex: tokens.zIndex,
    breakpoints: tokens.breakpoints,
    borderRadius: tokens.borderRadius,
    boxShadow: tokens.boxShadow,
};

const createTheme = (colorMode: 'dark' | 'light'): Theme => ({
    ...common,
    colors: {
        primary: tokens.colors.primary[colorMode],
        secondary: tokens.colors.secondary[colorMode],
        success: tokens.colors.success[colorMode],
        danger: tokens.colors.danger[colorMode],
        warning: tokens.colors.warning[colorMode],
        info: tokens.colors.info[colorMode],
        light: tokens.colors.light[colorMode],
        dark: tokens.colors.dark[colorMode],
        gray: tokens.colors.gray[colorMode],
        text: tokens.colors.common[colorMode === 'dark' ? 'white' : 'black'],
        background: tokens.colors.dark[colorMode],
    }
});

export const lightTheme = createTheme('dark');
export const darkTheme = createTheme('light');
