import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routing/routes';
import { lightTheme, darkTheme} from "./theming/theme"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./theming/GlobalStyle.ts"
import BackgroundImage from './components/BackgroundImage/index.tsx'
import NavBar from './components/NavBar/index.tsx';

const handleRouting = (theme: string, toggleTheme: () => void) => {
  return (
    <Router>
      <NavBar links={routes} theme={theme} toggleTheme={toggleTheme}/>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  )
}

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const imageURL = process.env.PUBLIC_URL + '/background.png';

  return (
    <BackgroundImage imageURL={imageURL} theme={theme}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <div>
          {handleRouting(theme, toggleTheme)}
        </div>
      </>
    </ThemeProvider>
    </BackgroundImage>
  );
}

export default App;
