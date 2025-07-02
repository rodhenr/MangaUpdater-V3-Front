import { apiClientDatabase, apiClientUser } from "../axiosClient";

export function createQuery<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const response = await apiClientDatabase.get<T>(endpoint);
    return response.data;
  };
}

export function createUserQuery<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const response = await apiClientUser.get<T>(endpoint);
    return response.data;
  };
}
