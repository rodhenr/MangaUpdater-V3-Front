import { IManga, IMangaSourceApi, ISource } from "../../interfaces/interfaces";
import { apiClientDatabase } from "../axiosClient";

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
