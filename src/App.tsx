import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider  as StyledThemeProvider } from "styled-components";
import { GlobalStyle } from "./theming/GlobalStyle.ts";
import BackgroundImage from './components/BackgroundImage/index.tsx';
import NavBar from './components/NavBar/index.tsx';
import { ThemeProvider as AppThemeProvider } from './theming/ThemeProvider.tsx';
import { routes } from './routing/routes.tsx';
import { ThemeContext, ThemeToggleContext} from './contexts/ThemeContext.tsx';
import AnimatedCursor from 'react-animated-cursor';

const MainContent = styled.div`
  padding-top: 70px; // Adjust this value based on the height of your navbar
`;

const App: React.FC = () => {

  return (
    <AppThemeProvider>
      <ThemeContext.Consumer>
      {(theme) => 
        <ThemeToggleContext.Consumer>
        {(toggleTheme) => 
          theme && toggleTheme ?
          <>
            <AnimatedCursor
              innerSize={8}
              outerSize={50}
              color='220, 220, 220' // light grey color
              outerAlpha={0.4}
              innerScale={0.7}
              outerScale={10}
              clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
                'h1',
                'h2',
                'h3',
                'h4',
                'p',
                'ul',
                'li'
              ]}
              innerStyle={{
                mixBlendMode: 'difference',
              }}
              outerStyle={{
                mixBlendMode: 'difference',
              }}
            />
          <BackgroundImage imageurl={process.env.PUBLIC_URL + '/background.png'}>
            <StyledThemeProvider theme={theme}>
              <>
                <GlobalStyle />
                <div>
                  <Router>
                    <NavBar links={routes} toggleTheme={toggleTheme}/>
                    <MainContent>
                      <Routes>
                        {routes.map((route, index) => (
                          <Route key={index} path={route.path} element={route.element} />
                        ))}
                      </Routes>
                  </MainContent>
                  </Router>
                </div>
              </>
            </StyledThemeProvider>
          </BackgroundImage>
          </>
          : null
        }
        </ThemeToggleContext.Consumer>
      }
      </ThemeContext.Consumer>
    </AppThemeProvider>
  );
}

export default App;