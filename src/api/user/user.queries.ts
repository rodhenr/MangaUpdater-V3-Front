import { createUserQuery } from "../utils/utils.fetchQuery";
import { IUserMangaData } from "./user.types";

export const fetchUserMangaQuery = (username: string) =>
  createUserQuery<IUserMangaData[]>(`api/info/user/${username}/chapters`);
