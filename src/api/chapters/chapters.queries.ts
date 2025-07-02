import { createPagedQuery } from "../utils/utils.fetchPagedQuery";
import { IPagedChaptersResponse } from "./chapters.types";

export const fetchPagedChapters =
  createPagedQuery<IPagedChaptersResponse>("api/chapters");
