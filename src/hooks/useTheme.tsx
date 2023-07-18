// useTheme.ts
import { useContext } from 'react';
import { ThemeContext, ThemeToggleContext } from '../contexts/ThemeContext';
import { Theme } from '../theming/theme';

const handleError = (context: any) => {
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
}

type ToggleThemeType = () => void;

const useAbstractContext = <T extends Theme | ToggleThemeType>(inputContext: React.Context<T | undefined>): T => {
  const context = useContext(inputContext);
  handleError(context);

  return context as T; // This ensures that the context is not null
}

export const useTheme = (): Theme => {
  return useAbstractContext(ThemeContext);
};

export const useToggleTheme = (): ToggleThemeType => {
  return useAbstractContext(ThemeToggleContext);
}
