import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import "./LayoutHome.scss";

export const LayoutHome: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(93, 173, 226, 0.12), transparent 24%), linear-gradient(180deg, #090c12 0%, #0f141d 100%)",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(17, 24, 39, 0.82)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 48, md: 54 },
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
              fontSize: "clamp(1.25rem, 0.95rem + 1vw, 1.65rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            <Box component="span" sx={{ color: "#E2E8F0" }}>
              Manga
            </Box>
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #5dade2 0%, #2e86de 100%)",
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
        sx={{
          marginTop: 2,
          px: { xs: 4, sm: 6, md: 8, lg: 24 },
          pb: 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
