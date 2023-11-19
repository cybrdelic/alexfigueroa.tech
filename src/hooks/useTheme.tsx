import { useContext } from 'react';
import { ThemeContext, ThemeToggleContext, ThemeContextType } from '../contexts/ThemeContext';
import { Theme } from '../theming/theme';

const handleError = (context: any, contextName: string) => {
  if (!context) {
    throw new Error(`Context ${contextName} must be used within its corresponding Provider`);
  }
};

const useAbstractContext = <T,>(inputContext: React.Context<T | undefined>, contextName: string): T => {
  if (!inputContext) {
    throw new Error(`Context '${contextName}' is not defined. Ensure it is imported correctly.`);
  }
  const context = useContext(inputContext);
  handleError(context, contextName);
  return context as T;
};

export const useTheme = (): Theme => {
  const context = useAbstractContext<ThemeContextType>(ThemeContext, 'ThemeContext');
  if (!context.theme) {
    throw new Error('Theme object is missing in ThemeContext');
  }
  return context.theme;
};

export const useSetDynamicBackground = (): ((color: string) => void) => {
  const context = useAbstractContext<ThemeContextType>(ThemeContext, 'ThemeContext');
  if (!context.setDynamicBackground) {
    throw new Error('setDynamicBackground function is missing in ThemeContext');
  }
  return context.setDynamicBackground;
}

export const useToggleTheme = (): (() => void) => {
  const toggleTheme = useAbstractContext<(() => void) | undefined>(ThemeToggleContext, 'ThemeToggleContext');
  if (!toggleTheme) {
    throw new Error('Toggle theme function is missing in ThemeToggleContext');
  }
  return toggleTheme;
}
