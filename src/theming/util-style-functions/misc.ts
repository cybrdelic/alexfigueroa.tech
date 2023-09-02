import { borderRadius } from "../design-tokens/effects";

export const rounded = (size: keyof typeof borderRadius = 'md') => `
  border-radius: ${borderRadius[size]};
`;
