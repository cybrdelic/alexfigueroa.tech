import React, { createContext, useContext, useState } from 'react';

interface CursorState {
    cursorType: 'normal' | 'hovered' | 'clicked';
    cursorPos: { x: number; y: number };
}

const CursorContext = createContext<[CursorState, React.Dispatch<React.SetStateAction<CursorState>>] | undefined>(undefined);

type CursorProviderProps = {
    children: React.ReactNode;
};
export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
    const state = useState<CursorState>({
        cursorType: 'normal',
        cursorPos: { x: 0, y: 0 }
    });
    return <CursorContext.Provider value={state}>{children}</CursorContext.Provider>;
};

export const useCursorState = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursorState must be used within a CursorProvider');
    }
    return context;
};
