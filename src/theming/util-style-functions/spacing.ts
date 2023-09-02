import { spacing } from "../design-tokens/spacing";

export const padding = (size: keyof typeof spacing) => `
  padding: ${spacing[size]};
`;

export const margin = (size: keyof typeof spacing) => `
  margin: ${spacing[size]};
`;
