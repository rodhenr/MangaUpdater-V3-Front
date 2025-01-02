import {
  IMangaPost,
  IMangaSourcePost,
  ISourcePost,
} from "../../interfaces/interfaces";
import { apiClientDatabase } from "../axiosClient";

export const postManga = async (manga: IMangaPost): Promise<void> => {
  await apiClientDatabase.post("api/manga", manga);
};

export const postSource = async (source: ISourcePost): Promise<void> => {
  await apiClientDatabase.post("api/source", source);
};

export const postMangaSources = async (
  mangaSource: IMangaSourcePost
): Promise<void> => {
  await apiClientDatabase.post("api/mangaSource", mangaSource);
};
