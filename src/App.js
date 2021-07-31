import React, { useContext } from 'react';
import Routes from './Routes';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { ThemeContext } from "../src/context/ThemeContext";




function App() {

  const themeDark = useContext(ThemeContext);
  const darkMode = themeDark.state.darkMode;

  const theme = createTheme({
    spacing: 4,
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  }, ptBR);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>

  );
}

export default App;
