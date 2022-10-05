import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "./i18n";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <UserProvider>
    <ThemeProvider>
      <CssBaseline />
      <App />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        position="bottom-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);
reportWebVitals();
