import { css } from "styled-components";
import { ThemeColors, ColorMode, Theme } from "../theme";

type ColorKey = keyof ThemeColors;

type RGB = {
  r: number;
  g: number;
  b: number;
};

const getColorValue = (theme: Theme, type: ColorKey): string => {
  if (typeof theme.colors[type] === 'string') {
    return theme.colors[type] as string;
  } else if (theme.mode && typeof (theme.colors[type] as ColorMode)[theme.mode] === 'string') {
    return (theme.colors[type] as ColorMode)[theme.mode];
  } else {
    return ''; // Default color or handle this scenario as desired
  }
};

const hexToRgb = (hex) => {
  hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

const rgbToHex = (r, g, b) => {
  return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

const shadeColor = (color, percent): RGB => {
  const amount = Math.round(1.2 * percent);
  return {
    r: Math.min(255, Math.max(0, color.r + amount)),
    g: Math.min(255, Math.max(0, color.g + amount)),
    b: Math.min(255, Math.max(0, color.b + amount))
  };
}

const generateBackgroundGradient = (hexColor: string) => {
  const originalColor = hexToRgb(hexColor);
  const lightShade = shadeColor(originalColor, 20); // Lighten by 20%
  const darkShade = shadeColor(originalColor, -20); // Darken by 20%

  const shadeLight = rgbToHex(lightShade.r, lightShade.g, lightShade.b);
  const shadeDark = rgbToHex(darkShade.r, darkShade.g, darkShade.b);

  return `linear-gradient(135deg, ${shadeLight} 0%, ${hexColor} 50%, ${shadeDark} 100%)`;
};

export const textColor = (theme: Theme, type: ColorKey) => {
  return `color: ${getColorValue(theme, type)};`
};

export const backgroundColor = (theme: Theme, type: ColorKey) => {
  return `background-color: ${getColorValue(theme, type)};`;
}

export const borderColor = (theme: Theme, type: ColorKey) => {
  return `border-color: ${getColorValue(theme, type)}; `
}

export const gradientBackground = (theme: Theme, type: ColorKey) => {
  const baseColor = getColorValue(theme, type);
  const gradient = generateBackgroundGradient(baseColor);
  return `background: ${gradient};`;
}

const neonizeText = (cssPropertyValue: string): string => {
  // Extract color value using regex
  const regex = /: ([#a-fA-F0-9]{3,8});$/;
  const match = cssPropertyValue.match(regex);
  if (!match) return cssPropertyValue; // Return original if no match

  const color = match[1];

  const originalColor = hexToRgb(color);
  const shadeLight = shadeColor(originalColor, 20);  // Lighten by 20%
  const shadeDark = shadeColor(originalColor, -20);  // Darken by 20%

  const neonGradient = `background: linear - gradient(135deg, ${rgbToHex(shadeLight.r, shadeLight.g, shadeLight.b)
    } 0 %, ${color} 50 %, ${rgbToHex(shadeDark.r, shadeDark.g, shadeDark.b)} 100 %);
-webkit - background - clip: text;
color: transparent; `;

  return neonGradient;
};

export const neonizedTextColor = (theme: Theme, type: ColorKey): string => {
  return neonizeText(textColor(theme, type));
};
