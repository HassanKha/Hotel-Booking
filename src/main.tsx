import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./modules/services/Theme.ts";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
       <AuthProvider>
          <App />
       </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
