import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
  <GoogleOAuthProvider
    clientId={
      "247368903001-3h3j1e2te1guj0k0giu526siund24sq5.apps.googleusercontent.com"
    }
  >
    <React.StrictMode>
      <App showNavbar={shouldShowNavbar} />
      <GlobalStyle />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
