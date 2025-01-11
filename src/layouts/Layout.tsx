import {
  AppBar,
  Box,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { Outlet } from "react-router";
import "./Layout.scss";

const Layout: React.FC = () => {
  const [username, setUsername] = useLocalStorage<string | null>(
    "username",
    null
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#111111" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">MangaInfo</Typography>
          <Box>
            <TextField
              variant="standard"
              color="warning"
              focused
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
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
