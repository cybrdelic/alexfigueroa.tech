// For centering elements absolutely
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

// For fixing an element to the top of the viewport
export const fixedTop = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

// For fixing an element to the bottom of the viewport
export const fixedBottom = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
`;

// For fixing an element to the left of the viewport
export const fixedLeft = `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
`;

// For fixing an element to the right of the viewport
export const fixedRight = `
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
`;

// For sticky positioning, typically used with headers or navigation that should stick at the top while scrolling
export const stickyTop = `
    position: sticky;
    top: 0;
`;

// For sticky positioning at the bottom, possibly for footers
export const stickyBottom = `
    position: sticky;
    bottom: 0;
`;

// For absolute positioning at the top-left corner
export const absoluteTopLeft = `
    position: absolute;
    top: 0;
    left: 0;
`;

// For absolute positioning at the top-right corner
export const absoluteTopRight = `
    position: absolute;
    top: 0;
    right: 0;
`;

// For absolute positioning at the bottom-left corner
export const absoluteBottomLeft = `
    position: absolute;
    bottom: 0;
    left: 0;
`;

// For absolute positioning at the bottom-right corner
export const absoluteBottomRight = `
    position: absolute;
    bottom: 0;
    right: 0;
`;

// For ensuring an element takes up the full viewport height
export const fullHeight = `
    height: 100vh;
`;

// For ensuring an element takes up the full viewport width
export const fullWidth = `
    width: 100vw;
`;

// Our previously defined positions...
// ...

// Full viewport dimensions
export const fullViewport = `
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

// Above the fold (the part of the webpage visible without scrolling)
export const aboveTheFold = `
    height: 100vh;
    overflow: hidden;
`;

// Positioned relative and offset from the top
export const relativeTop = (offset: string) => `
    position: relative;
    top: ${offset};
`;

// Positioned relative and offset from the bottom
export const relativeBottom = (offset: string) => `
    position: relative;
    bottom: ${offset};
`;

// Positioned relative and offset from the left
export const relativeLeft = (offset: string) => `
    position: relative;
    left: ${offset};
`;

// Positioned relative and offset from the right
export const relativeRight = (offset: string) => `
    position: relative;
    right: ${offset};
`;

// Element covering its parent, usually used for overlays or background elements
export const coverParent = `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

// To ensure that an element is stacked above others
export const zAbove = (value: number) => `
    z-index: ${value};
`;

// To ensure that an element is stacked below others
export const zBelow = (value: number) => `
    z-index: -${value};
`;

// For elements you want to hide visually but make accessible for screen readers
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

// For creating a new local stacking context
export const stackingContext = `
    position: relative;
    z-index: 0;
`;

// For fixed position at a specific point in the viewport
export const fixedPosition = (x: string, y: string) => `
    position: fixed;
    top: ${y};
    left: ${x};
`;

// And more...

