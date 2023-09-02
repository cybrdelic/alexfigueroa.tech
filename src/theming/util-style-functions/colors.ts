import { css } from "styled-components";
import { colors } from "../design-tokens/colors";

export const textColor = (color: string, type: keyof typeof colors) => `
  color: ${colors[type]};
`;

export const backgroundColor = (type: keyof typeof colors) => `
  background-color: ${colors[type]};
`;

export const borderColor = (type: keyof typeof colors) => `
  border-color: ${colors[type]};
`;

export const setBackground = (color: string) => `
    background-color: ${color};
`;

export const setGradientBackground = (gradient: string) => `
    background: ${gradient}
`
