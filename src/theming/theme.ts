import * as tokens from "./design-tokens";

export interface Theme {
    body: string;
    text: string;
    toggleBorder: string;
    gradient: string;
    cardBackground: string;
    primary: string;
    secondary: string;
    accent: string;
    hover: string;
    shadow: string;
    borderRadius: string;
    transition: string;
    fontFamily: string;
    error: string;
    success: string;
    cardColor: string;
    name: string;
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

const createTheme = (colorMode: 'dark' | 'light') => ({
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
