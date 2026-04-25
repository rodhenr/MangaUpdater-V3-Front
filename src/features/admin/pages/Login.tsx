import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../auth/AuthContext";

interface IRedirectState {
  from?: {
    pathname?: string;
  };
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectPath =
    (location.state as IRedirectState | null)?.from?.pathname || "/admin";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await login({ password, username });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
      }}
    >
      <Paper
        component="form"
        elevation={6}
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
          maxWidth: 420,
          p: 4,
          width: "100%",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" fontWeight={700} variant="h4">
              Admin Login
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Sign in to access the admin area.
            </Typography>
          </Box>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <TextField
            autoComplete="username"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
            value={username}
          />

          <TextField
            autoComplete="current-password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />

          <Button disabled={isLoading} size="large" type="submit" variant="contained">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};