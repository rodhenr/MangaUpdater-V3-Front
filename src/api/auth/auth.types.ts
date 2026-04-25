export interface IAuthUser {
  id: number | string;
  role: string;
  username: string;
}

export interface ILoginRequest {
  password: string;
  username: string;
}

export interface ILoginResponse {
  expiresAt?: string;
  token: string;
  user: IAuthUser;
}

export interface ILoginApiResponse {
  errorContent: string | null;
  isSuccess: boolean;
  payload: ILoginResponse;
  statusCode: number;
}