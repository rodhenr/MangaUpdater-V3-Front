import { createPagedQuery } from "../utils/utils.fetchPagedQuery";
import { IPagedMangaSourceResponse } from "./mangasource.types";

export const fetchPagedMangaSources =
  createPagedQuery<IPagedMangaSourceResponse>("api/mangasource");
