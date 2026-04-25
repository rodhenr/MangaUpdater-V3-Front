import { CircularProgress, Stack } from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginAdmin } from "../../../api/auth/auth.commands";
import { fetchAuthenticatedAdmin } from "../../../api/auth/auth.queries";
import {
  clearStoredAdminAuth,
  getStoredAdminAuth,
  setStoredAdminAuth,
} from "../../../api/auth/auth.storage";
import { IAuthUser, ILoginRequest } from "../../../api/auth/auth.types";

interface IAdminAuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: ILoginRequest) => Promise<void>;
  logout: () => void;
  token: string | null;
  user: IAuthUser | null;
}

const storedAuth = getStoredAdminAuth();

const AdminAuthContext = createContext<IAdminAuthContextValue | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(storedAuth?.token ?? null);
  const [user, setUser] = useState<IAuthUser | null>(storedAuth?.user ?? null);
  const [isLoading, setIsLoading] = useState(Boolean(storedAuth?.token));

  const logout = () => {
    clearStoredAdminAuth();
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const validateSession = async () => {
      setIsLoading(true);

      try {
        const authenticatedUser = await fetchAuthenticatedAdmin();

        if (!isMounted) {
          return;
        }

        if (authenticatedUser.role !== "admin") {
          logout();
          return;
        }

        setUser(authenticatedUser);

        const persistedAuth = getStoredAdminAuth();
        if (persistedAuth) {
          setStoredAdminAuth({
            ...persistedAuth,
            user: authenticatedUser,
          });
        }
      } catch {
        if (isMounted) {
          logout();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void validateSession();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (credentials: ILoginRequest) => {
    setIsLoading(true);

    try {
      const response = await loginAdmin(credentials);

      if (response.user.role !== "admin") {
        throw new Error("This user does not have admin access.");
      }

      setStoredAdminAuth({
        expiresAt: response.expiresAt,
        token: response.token,
        user: response.user,
      });

      setToken(response.token);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated: Boolean(token) && user?.role === "admin",
      isLoading,
      login,
      logout,
      token,
      user,
    }),
    [isLoading, token, user]
  );

  if (isLoading && !user && token) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
};