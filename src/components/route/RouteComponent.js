import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page-components/LoginPage";
import App from "../../App";
import DashboardPage from "../page-components/DashboardPage";
import UserContext from "../../Context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RouteComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        {" "}
        <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Routes>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default RouteComponent;
