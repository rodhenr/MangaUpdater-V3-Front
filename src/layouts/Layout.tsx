import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import "./Layout.scss";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#111111" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">MangaInfo</Typography>
          <Box>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
