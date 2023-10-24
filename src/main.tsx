import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App.tsx";
import "./styles.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const shouldShowNavbar = location.pathname !== "/login";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App showNavbar={shouldShowNavbar} />
    <GlobalStyle />
  </React.StrictMode>
);
