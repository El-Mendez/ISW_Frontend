import React, { useState } from 'react';
import styled,{ ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from '../themes';
import MainRoutes from './mainRoutes';

const StyledApp = styled.div`

  color: ${(props) => props.theme.fontColor};

`;

export default function App() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme ={theme === "light" ? lightTheme : darkTheme}>
      <StyledApp>
        <div className="vh-100">
          <MainRoutes />
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}
