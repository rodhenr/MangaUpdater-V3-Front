import { deleteCommand } from "../utils/utils.deleteQuery";
import { postCommand } from "../utils/utils.postQuery";
import { updateCommand } from "../utils/utils.updateQuery";
import { ICreateMangaData, IUpdateMangaData } from "./manga.types";

export const postManga = (manga: ICreateMangaData) =>
  postCommand<ICreateMangaData, void>("api/manga", manga);

export const updateManga = (id: number, manga: IUpdateMangaData) =>
  updateCommand<IUpdateMangaData, void>(`api/manga/${id}`, manga);

export const deleteManga = (id: number) =>
  deleteCommand<void>(`api/manga/${id}`);
