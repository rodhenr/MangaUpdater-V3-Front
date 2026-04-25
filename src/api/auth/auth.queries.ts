import { createQuery } from "../utils/utils.fetchQuery";
import { IAuthUser } from "./auth.types";

export const fetchAuthenticatedAdmin = createQuery<IAuthUser>("api/auth/me");