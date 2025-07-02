import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes } from "react-router";
import { adminRoutes } from "./features/admin/admin.routes";
import { homeRoutes } from "./features/home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {homeRoutes}
          {adminRoutes}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
