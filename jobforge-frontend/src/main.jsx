import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/open-sans";

const PUBLISHABLE_KEY = "pk_test_Z2VudWluZS1jcmlja2V0LTc1LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => window.history.pushState(null, "", to)}
    >
      <CssVarsProvider defaultMode="light">
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssVarsProvider>
    </ClerkProvider>
  </React.StrictMode>
);
