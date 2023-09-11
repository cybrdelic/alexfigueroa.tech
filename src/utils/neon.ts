

type ColorKey = keyof ThemeColors;

const neonizeText = (cssPropertyValue: string): string => {
    // ... same as before
};

export const neonizedTextColor = (theme: Theme, type: ColorKey): string => {
    return neonizeText(textColor(theme, type));
};
