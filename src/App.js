import React from 'react';
import Routes from './Routes';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';



function App() {

  const theme = createTheme({
    
    spacing: 4,
    palette: {
      primary: {
        main: '#262626',
      },
      secondary: {
        main: '#262626',
      },
    },
  }, ptBR);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>

  );
}

export default App;
