import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AuthContext";

export const RequireAdminAuth: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
      </Stack>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};