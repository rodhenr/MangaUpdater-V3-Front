import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import "./Layout.scss";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#1B1B1F" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 8, sm: 8, md: 8, lg: 24 },
          }}
        >
          <Typography variant="h6">MangaInfo</Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{ marginTop: 4, px: { xs: 8, sm: 8, md: 8, lg: 24 } }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
