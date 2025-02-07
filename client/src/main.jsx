import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none", // Removes the focus outline globally
        },
      },
    },
  },
});

const isGitHubPages = window.location.hostname.includes("github.io");
const repoName = "CodeScout"; // Change this if your repo name is different

const basename = isGitHubPages ? `/${repoName}` : "";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
