import { apiClientDatabase, apiClientUser } from "../axiosClient";

export async function postCommand<TPayload, TResponse = void>(
  endpoint: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await apiClientDatabase.post<TResponse>(endpoint, payload);
  return response.data;
}

export async function postUserCommand<TPayload, TResponse = void>(
  endpoint: string,
  payload: TPayload
): Promise<TResponse> {
  const response = await apiClientUser.post<TResponse>(endpoint, payload);
  return response.data;
}
