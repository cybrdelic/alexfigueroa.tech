import { zIndex } from "../design-tokens/spacing";
import { mq } from "./responsive";

export const absoluteCenter = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// To establish a stacking context without shifting the element
export const relative = `
    position: relative;
`;

// Fixed positions with defaults for padding
export const fixedTop = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0;

    ${mq('sm')} {
        padding: 0 10px;
    }

    ${mq('lg')} {
        padding: 0 30px;
    }
`;

export const fixedBottom = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;

    ${mq('sm')} {
        padding: 0 10px;
    }

    ${mq('lg')} {
        padding: 0 30px;
    }
`;

export const fixedBottomRight = `
    position: fixed;
    bottom: 0;
    right: 0;

    ${mq('sm')} {
        padding-right: 10px;
        padding-bottom: 10px;
    }

    ${mq('lg')} {
        padding-right: 30px;
        padding-bottom: 30px;
    }
`;




export const fixedLeft = `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    ${mq('md')} {
        width: 60px;  // Example, adjust as needed
    }
`;

export const fixedRight = `
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;

    ${mq('md')} {
        width: 60px;  // Example, adjust as needed
    }
`;

// Sticky positions, can have different 'top' or 'bottom' values at various breakpoints
export const stickyTop = `
    position: sticky;
    top: 0;

    ${mq('lg')} {
        top: 10px;
    }
`;

export const stickyBottom = `
    position: sticky;
    bottom: 0;

    ${mq('lg')} {
        bottom: 10px;
    }
`;

// ... rest of the utilities can follow the same pattern ...

export const aboveTheFold = `
    height: 100vh;
    overflow: hidden;

    ${mq('md')} {
        height: 90vh;
    }

    ${mq('lg')} {
        height: 85vh;
    }
`;

export const fullViewport = `
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    ${mq('sm')} {
        height: 95vh;
    }
`;
export const absoluteTopLeft = `
    position: absolute;
    top: 0;
    left: 0;
    ${mq('sm')} {
        top: 5px;
        left: 5px;
    }
`;

export const absoluteTopRight = `
    position: absolute;
    top: 0;
    right: 0;

    ${mq('sm')} {
        top: 5px;
        right: 5px;
    }
`;

export const absoluteBottomLeft = `
    position: absolute;
    bottom: 0;
    left: 0;

    ${mq('sm')} {
        bottom: 5px;
        left: 5px;
    }
`;

export const absoluteBottomRight = `
    position: absolute;
    bottom: 0;
    right: 0;

    ${mq('sm')} {
        bottom: 5px;
        right: 5px;
    }
`;

// For adjusting viewport dimensions
export const fullHeight = `
    height: 100vh;

    ${mq('sm')} {
        height: 95vh;
    }
`;

export const fullWidth = `
    width: 100vw;

    ${mq('sm')} {
        width: 95vw;
    }
`;

// Adjusting relative positions
export const relativeTop = (offset: string) => `
    position: relative;
    top: ${offset};

    ${mq('sm')} {
        top: calc(${offset} + 5px);  // Adjusting by 5px as an example
    }
`;

export const relativeBottom = (offset: string) => `
    position: relative;
    bottom: ${offset};

    ${mq('sm')} {
        bottom: calc(${offset} + 5px);
    }
`;

export const relativeLeft = (offset: string) => `
    position: relative;
    left: ${offset};

    ${mq('sm')} {
        left: calc(${offset} + 5px);
    }
`;

export const relativeRight = (offset: string) => `
    position: relative;
    right: ${offset};

    ${mq('sm')} {
        right: calc(${offset} + 5px);
    }
`;

// Covering parent - Often used for background images or overlays.
export const coverParent = `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    ${mq('sm')} {
        padding: 10px;  // Example to slightly move from the edges on smaller screens
    }
`;

// Z-index adjustments might not need responsive variations unless your design specifically needs them
export const zAbove = (value: number) => `
    z-index: ${value};
`;

export const zBelow = (value: number) => `
    z-index: -${value};
`;

// Accessibility utility
export const srOnly = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

// Stacking context. Assuming you might need to adjust stack order based on device sizes.
export const stackingContext = `
    position: relative;
    z-index: 0;

    ${mq('sm')} {
        z-index: 1;
    }
`;

// Fixed position, often used for modal dialogs or notifications.
export const fixedPosition = (x: string, y: string) => `
    position: fixed;
    top: ${y};
    left: ${x};

    ${mq('sm')} {
        top: calc(${y} + 5px);  // Small adjustments as an example
        left: calc(${x} + 5px);
    }
`;

// ... and other
