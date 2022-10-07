import React from 'react';
import Routes from './Routes';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { useDarkState } from '../src/context/ThemeContext';

function App() {
  const { state } = useDarkState();
  const { darkMode } = state;
  const theme = createTheme(
    {
      spacing: 4,
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#e3dede' : '#242424',
        },
        secondary: {
          main: darkMode ? '#e3dede' : '#242424',
        },
      },
    },
    ptBR,
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
