import { boxShadow, transitions } from "../design-tokens/effects";

export const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const textCenter = `
  text-align: center;
`;

export const flexWrap = `
    display: flex;
    flex-wrap: wrap;
`;

export const flexStart = `
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const flexEnd = `
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const flexBetween = `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumn = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const flexColumnStart = `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const flexColumnEnd = `
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`

export const elevated = (size: keyof typeof boxShadow = 'md') => `
  box-shadow: ${boxShadow[size]};
`;

export const transition = (speed: keyof typeof transitions = 'normal') => `
  transition: ${transitions[speed]};
`;

// ... Add more as needed, for example, transforms, animations, etc.
