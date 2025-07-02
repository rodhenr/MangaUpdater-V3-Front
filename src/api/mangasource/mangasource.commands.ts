import { deleteCommand } from "../utils/utils.deleteQuery";
import { postCommand } from "../utils/utils.postQuery";
import { ICreateMangaSourceData } from "./mangasource.types";

export const postMangaSource = (mangaSource: ICreateMangaSourceData) =>
  postCommand<ICreateMangaSourceData, void>("api/mangasource", mangaSource);

export const deleteMangaSource = (id: number) =>
  deleteCommand<void>(`api/mangasource/${id}`);
