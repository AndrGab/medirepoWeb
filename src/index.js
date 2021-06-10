import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserProvider } from "./context/UserContext";


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CssBaseline />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
