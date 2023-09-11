import { createContext } from 'react';

export const CursorContext = createContext({
    cursorPos: { x: 0, y: 0 },
    cursorType: 'normal',
});
