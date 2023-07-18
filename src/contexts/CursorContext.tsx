import { createContext } from 'react';

export const CursorContext = createContext<'normal' | 'hovered'>('normal');
