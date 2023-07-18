import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "./theming/GlobalStyle.ts";
import BackgroundImage from './components/BackgroundImage/index.tsx';
import NavBar from './components/NavBar/index.tsx';
import { ThemeProvider as AppThemeProvider } from './theming/ThemeProvider.tsx';
import { routes } from './routing/routes.tsx';
import { ThemeContext, ThemeToggleContext } from './contexts/ThemeContext.tsx';
import AnimatedCursor from 'react-animated-cursor';
import CustomCursor from './components/Cursor/index.tsx';
import { CursorContext } from './contexts/CursorContext.tsx';
import { useCursorEffect } from './hooks/useCursorEffect.tsx';
import ThemeToggle from './components/ThemeToggle/index.tsx';

const MainContent = styled.div`
  padding-top: 70px; // Adjust this value based on the height of your navbar
`;

const ThemeToggleWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9998;
`;
const App: React.FC = () => {
  const cursorType = useCursorEffect();

  return (
    <AppThemeProvider>
      <CursorContext.Provider value={cursorType}>
        <Router>
          <CustomCursor />
          <ThemeContext.Consumer>
            {(theme) =>
              <ThemeToggleContext.Consumer>
                {(toggleTheme) =>
                  theme && toggleTheme ?
                    <>
                      <BackgroundImage imageurl={process.env.PUBLIC_URL + '/background.png'}>
                        <StyledThemeProvider theme={theme}>
                          <GlobalStyle />
                          <div>

                            <NavBar links={routes} toggleTheme={toggleTheme} />
                            <MainContent>
                              <Routes>
                                {routes.map((route, index) => (
                                  <Route key={index} path={route.path} element={route.element} />
                                ))}
                              </Routes>
                            </MainContent>

                          </div>
                          <ThemeToggleWrapper>
                            <ThemeToggle onClick={toggleTheme} />
                          </ThemeToggleWrapper>
                        </StyledThemeProvider>
                      </BackgroundImage>
                    </>
                    : null
                }
              </ThemeToggleContext.Consumer>
            }
          </ThemeContext.Consumer>
        </Router>
      </CursorContext.Provider>
    </AppThemeProvider>
  );
}

export default App;
