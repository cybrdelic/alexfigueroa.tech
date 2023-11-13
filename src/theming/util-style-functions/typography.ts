import { projectsData } from "../../data/project.data";
import { typography } from "../design-tokens/typography";
export const fontSize = (size: keyof typeof typography.fontSize) => `
  font-size: ${typography.fontSize[size]};
`;

export const fontWeight = (weight: keyof typeof typography.fontWeight) => `
  font-weight: ${typography.fontWeight[weight]};
`;

export const letterSpacing = (spacing: keyof typeof typography.letterSpacing) => `
  letter-spacing: ${typography.letterSpacing[spacing]};
`;

export const lineHeight = (height: keyof typeof typography.lineHeight) => `
  line-height: ${typography.lineHeight[height]};
`;

export const fontFamily = (customFont?: string) => {
  return `font-family: ${customFont ?? 'Poppins'}, sans-serif;`;
}


// ... Add more as needed
