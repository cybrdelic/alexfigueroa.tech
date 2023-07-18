import { useEffect, useState } from "react";
import { ThemeContext, ThemeToggleContext } from "../contexts/ThemeContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Theme, darkTheme, lightTheme } from "./theme";
import {ThemeProvider as StyledComponentsThemeProvider} from "styled-components"

export interface ThemeProviderProps {
    children: React.ReactNode;
}


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
    };

    useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      if (localTheme) {
        setTheme(localTheme === 'light' ? lightTheme : darkTheme);
      }
    }, []);

    return (
      <ThemeToggleContext.Provider value={toggleTheme}>
        <ThemeContext.Provider value={theme}>
          <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
        </ThemeContext.Provider>
      </ThemeToggleContext.Provider>
    );
};
