import * as tokens from "./design-tokens";
import { colors } from "./design-tokens";

type SimpleColorKey = 'text' | 'background' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'gray';

export interface ColorMode {
    light: string;
    dark: string;
}
export interface ThemeColors {
    primary: ColorMode;
    secondary: ColorMode;
    success: ColorMode;
    danger: ColorMode;
    warning: ColorMode;
    info: ColorMode;
    light: ColorMode;
    dark: ColorMode;
    gray: ColorMode;
    text: string;
    background: string;
    common: {
        white: string;
        black: string;
    };
    neon: {
        blue: string;
        green: string;
        red: string;
    };
}

export interface Theme {
    mode: 'light' | 'dark'
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

export const createTheme = (colorMode: 'dark' | 'light', dynamicBackground?: string): Theme => ({
    ...common,
    colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        danger: colors.danger,
        warning: colors.warning,
        info: colors.info,
        light: colors.light,
        dark: colors.dark,
        gray: colors.gray,
        text: colorMode === 'dark' ? colors.common.white : colors.common.black,
        common: colors.common,
        neon: colors.neon,
        background: dynamicBackground || (colorMode === 'dark' ? colors.dark.dark : colors.light.light),


    },
    mode: colorMode
});


export const lightTheme = createTheme('dark');
export const darkTheme = createTheme('light');
