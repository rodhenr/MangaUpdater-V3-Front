import {
  ILog,
  IManga,
  IMangaSourceApi,
  ISource,
  IUserData,
} from "../../interfaces/interfaces";
import { apiClientDatabase, apiClientUser } from "../axiosClient";

export const fetchLogs = async (): Promise<ILog[]> => {
  const response = await apiClientDatabase.get<ILog[]>("api/log");

  return response.data;
};

export const fetchMangas = async (): Promise<IManga[]> => {
  const response = await apiClientDatabase.get<IManga[]>("api/manga");

  return response.data;
};

export const fetchSources = async (): Promise<ISource[]> => {
  const response = await apiClientDatabase.get<ISource[]>("api/source");

  return response.data;
};

export const fetchMangaSources = async (): Promise<IMangaSourceApi[]> => {
  const response = await apiClientDatabase.get<IMangaSourceApi[]>(
    "api/mangaSource"
  );

  return response.data;
};

export const fetchUserData = async (user: string): Promise<IUserData[]> => {
  const response = await apiClientUser.get<IUserData[]>(
    `api/info/user/${user}/chapters`
  );

  return response.data;
};
