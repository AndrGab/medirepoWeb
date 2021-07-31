import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <UserProvider>
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
