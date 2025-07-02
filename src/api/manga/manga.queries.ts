import { createPagedQuery } from "../utils/utils.fetchPagedQuery";
import { createQuery } from "../utils/utils.fetchQuery";
import { IMangaBResponse, IMangaResponse } from "./manga.types";

export const fetchPagedMangas = createPagedQuery<IMangaResponse>("api/manga");

export const fetchMangaById = (id: number) =>
  createQuery<IMangaBResponse | null>(`api/manga/${id}`);
