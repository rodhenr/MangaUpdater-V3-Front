import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import "./LayoutHome.scss";

export const LayoutHome: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#1B1B1F" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 8, sm: 8, md: 8, lg: 24 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: "0.1em",
              m: 0,
              fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontSize: "clamp(1.75rem, 1.2rem + 1.75vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            <Box component="span" sx={{ color: "#E5E7EB" }}>
              Manga
            </Box>
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(90deg, #4F7CFF 0%, #6366F1 50%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Info
            </Box>
          </Typography>
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
