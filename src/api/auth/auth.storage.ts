import { IAuthUser } from "./auth.types";

const ADMIN_AUTH_STORAGE_KEY = "adminAuth";

export interface IStoredAdminAuth {
  expiresAt?: string;
  token: string;
  user: IAuthUser;
}

export const getStoredAdminAuth = (): IStoredAdminAuth | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as IStoredAdminAuth;

    if (!parsedValue.token || !parsedValue.user) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
};

export const setStoredAdminAuth = (auth: IStoredAdminAuth) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAdminAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};