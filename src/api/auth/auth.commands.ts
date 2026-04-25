import { postUserCommand } from "../utils/utils.postQuery";
import { ILoginApiResponse, ILoginRequest, ILoginResponse } from "./auth.types";

export const loginAdmin = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const response = await postUserCommand<ILoginRequest, ILoginApiResponse>(
    "api/auth/login",
    payload
  );

  return response.payload;
};