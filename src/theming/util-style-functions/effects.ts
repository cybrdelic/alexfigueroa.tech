import { boxShadow, transitions } from "../design-tokens/effects";


export const elevated = (size: keyof typeof boxShadow = 'md') => `
  box-shadow: ${boxShadow[size]};
`;

export const transition = (speed: keyof typeof transitions = 'normal') => `
  transition: ${transitions[speed]};
`;

// ... Add more as needed, for example, transforms, animations, etc.
