import { apiClientDatabase } from "../axiosClient";

export async function postCommand<TPayload, TResponse = void>(
  endpoint: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await apiClientDatabase.post<TResponse>(endpoint, payload);
  return response.data;
}
