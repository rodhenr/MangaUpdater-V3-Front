import {
  AccountTree,
  ChevronLeft,
  ChevronRight,
  Home,
  Language,
  Logout,
  MenuBook,
  Queue,
  ReceiptLong,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../auth/AuthContext";

const expandedWidth = 240;
const collapsedWidth = 72;

const menuItems = [
  { text: "Home", icon: <Home />, to: "/admin" },
  { text: "Queue", icon: <Queue />, to: "/admin/queue" },
  { text: "Logs", icon: <ReceiptLong />, to: "/admin/logs" },
  { text: "Manga", icon: <MenuBook />, to: "/admin/manga" },
  { text: "Source", icon: <Language />, to: "/admin/source" },
  { text: "Manga Source", icon: <AccountTree />, to: "/admin/mangasource" },
];

export const LayoutAdmin: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAdminAuth();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(7, 10, 15, 0.98) 0%, rgba(11, 16, 24, 0.98) 100%)",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          px: 2,
          justifyContent: collapsed ? "center" : "space-between",
          bgcolor: "rgba(255, 255, 255, 0.03)",
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
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
              mx: collapsed ? 1 : 1.5,
              mb: 0.5,
              borderRadius: 3,
              px: collapsed ? 1.5 : 2,
              "&.Mui-selected": {
                bgcolor: "rgba(93, 173, 226, 0.18)",
                border: "1px solid rgba(93, 173, 226, 0.26)",
                "&:hover": { bgcolor: "rgba(93, 173, 226, 0.24)" },
              },
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
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
      <Divider sx={{ borderColor: "#333" }} />
      <Box
        sx={{
          mx: collapsed ? 1 : 1.5,
          mt: 1.5,
          mb: 0.5,
          px: collapsed ? 1 : 1.5,
          py: 1.25,
          borderRadius: 3,
          border: `1px solid ${alpha("#5dade2", 0.18)}`,
          backgroundColor: alpha("#5dade2", 0.08),
        }}
      >
        {collapsed ? (
          <Tooltip title={user?.username ?? "Admin"} placement="right">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                mx: "auto",
                bgcolor: "rgba(93, 173, 226, 0.18)",
                color: "#d7ecff",
              }}
            >
              {user?.username?.slice(0, 1).toUpperCase() ?? "A"}
            </Avatar>
          </Tooltip>
        ) : (
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar sx={{ width: 38, height: 38, bgcolor: "rgba(93, 173, 226, 0.18)", color: "#d7ecff" }}>
              {user?.username?.slice(0, 1).toUpperCase() ?? "A"}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>{user?.username ?? "Admin"}</Typography>
              <Typography variant="caption" sx={{ color: "rgba(226, 232, 240, 0.62)" }}>
                Operations workspace
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: "white",
            justifyContent: collapsed ? "center" : "initial",
            mx: collapsed ? 1 : 1.5,
            my: 1,
            borderRadius: 3,
            px: collapsed ? 1.5 : 2,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <Tooltip title={collapsed ? "Sign out" : ""} placement="right">
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 0,
                mr: collapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>
          </Tooltip>
          {!collapsed && <ListItemText primary="Sign out" />}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(93, 173, 226, 0.12), transparent 26%), linear-gradient(180deg, #090c12 0%, #0f141d 100%)",
      }}
    >
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
            bgcolor: "transparent",
            color: "white",
            borderRight: "1px solid rgba(148, 163, 184, 0.12)",
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
          px: { xs: 2, md: 3.5 },
          py: { xs: 2, md: 3 },
          width: {
            sm: `calc(100% - ${collapsed ? collapsedWidth : expandedWidth}px)`,
          },
          color: "white",
          minHeight: "100vh",
          mt: !isSmUp ? 7 : 0,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Box sx={{ maxWidth: 1480, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
