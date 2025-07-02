import { apiClientDatabase } from "../axiosClient";

export async function deleteCommand<TResponse = void>(
  endpoint: string
): Promise<TResponse> {
  const response = await apiClientDatabase.delete<TResponse>(endpoint);
  return response.data;
}
