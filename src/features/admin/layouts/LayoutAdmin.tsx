import {
  ChevronLeft,
  ChevronRight,
  Home,
  ListAlt,
  MenuBook,
  Queue,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const expandedWidth = 240;
const collapsedWidth = 72;

const menuItems = [
  { text: "Home", icon: <Home />, to: "/admin" },
  { text: "Queue", icon: <Queue />, to: "/admin/queue" },
  { text: "Logs", icon: <ListAlt />, to: "/admin/logs" },
  { text: "Manga", icon: <MenuBook />, to: "/admin/manga" },
  { text: "Source", icon: <MenuBook />, to: "/admin/source" },
  { text: "Manga Source", icon: <MenuBook />, to: "/admin/mangasource" },
  { text: "Configuration", icon: <MenuBook />, to: "/admin/mangasource" },
];

export const LayoutAdmin: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0B0D11",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          px: 2,
          justifyContent: collapsed ? "center" : "space-between",
          bgcolor: "#1B1B1F",
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        )}
        <IconButton
          onClick={toggleCollapsed}
          sx={{ color: "white" }}
          size="small"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: "#333" }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon, to }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={to}
            selected={location.pathname === to}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "white",
              justifyContent: collapsed ? "center" : "initial",
              px: collapsed ? 1.5 : 2,
              "&.Mui-selected": {
                bgcolor: "#333",
                "&:hover": { bgcolor: "#444" },
              },
              "&:hover": {
                bgcolor: "#2a2a2a",
              },
            }}
          >
            <Tooltip title={collapsed ? text : ""} placement="right">
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
            </Tooltip>
            {!collapsed && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#121212", minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer
        variant={isSmUp ? "permanent" : "temporary"}
        open={isSmUp ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: collapsed ? collapsedWidth : expandedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : expandedWidth,
            boxSizing: "border-box",
            bgcolor: "#1B1B1F",
            color: "white",
            borderRight: "1px solid #333",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${collapsed ? collapsedWidth : expandedWidth}px)`,
          },
          color: "white",
          backgroundColor: "#121418",
          minHeight: "100vh",
          mt: !isSmUp ? 7 : 0,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
