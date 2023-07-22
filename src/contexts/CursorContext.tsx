import { createContext } from 'react';

export const CursorContext = createContext<'normal' | 'hovered' | 'clicked'>('normal');
