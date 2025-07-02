import { apiClientDatabase } from "../axiosClient";

export async function updateCommand<TPayload, TResponse = void>(
  endpoint: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await apiClientDatabase.put<TResponse>(endpoint, payload);
  return response.data;
}
