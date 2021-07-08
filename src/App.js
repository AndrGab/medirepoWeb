import React from 'react';
import Routes from './Routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';



function App() {

  const theme = createMuiTheme({
    
    spacing: 4,
    palette: {
      primary: {
        main: '#262626',
      },
      secondary: {
        main: '#262626',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>

  );
}

export default App;
