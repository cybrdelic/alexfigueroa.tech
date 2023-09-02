import { breakpoints } from "../design-tokens/responsive";
export const mq = (size: keyof typeof breakpoints) => `
    @media (max-width: ${breakpoints[size]}) {
`;
