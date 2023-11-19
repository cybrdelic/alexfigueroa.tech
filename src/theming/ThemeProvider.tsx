import { useEffect, useState } from "react";
import { ThemeContext, ThemeToggleContext } from "../contexts/ThemeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Theme, createTheme, darkTheme, lightTheme } from "./theme";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components"

export interface ThemeProviderProps {
  children: React.ReactNode;
}


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [dynamicBackground, setDynamicBackground] = useState('');
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  useEffect(() => {
    if (dynamicBackground) {
      setTheme(prevTheme => createTheme(prevTheme.mode, dynamicBackground));
    }
  }, [dynamicBackground]);

  const contextValue = {
    theme,
    setDynamicBackground: (color: string) => {
      setDynamicBackground(color);
    }
  };

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={contextValue}>
        <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
      </ThemeContext.Provider>
    </ThemeToggleContext.Provider>
  );
};
