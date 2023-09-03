import { projectsData } from "../../data/project.data";

export const typography = {
    fontFamily: projectsData.x1dra.titleFont,
    fontSize: {
        xsmall: '0.625rem',
        small: '0.875rem',
        base: '1rem',
        large: '1.25rem',
        poster: '6rem',
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
    },
    fontWeight: {
        normal: 400,
        bold: 700,
        // Add others as needed.
    },
    letterSpacing: {
        normal: 'normal',
        wide: '0.05em',
        wider: '0.1em',
        // Add others as needed.
    },
    lineHeight: {
        small: 1.4, // Typically used for small font sizes
        base: 1.6,  // Standard text
        heading: 1.2, // For h1, h2, etc. Tighter line height for headings
        relaxed: 1.8, // More space, could be used for quotes or less dense text
        // Define others as needed.
    }
};
