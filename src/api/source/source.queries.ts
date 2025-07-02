import { createPagedQuery } from "../utils/utils.fetchPagedQuery";
import { createQuery } from "../utils/utils.fetchQuery";
import {
  IPagedSourceResponse,
  ISourceDistributionResponse,
} from "./source.types";

export const fetchPagedSources =
  createPagedQuery<IPagedSourceResponse>("api/source");

export const fetchSourceDistribution = createQuery<
  ISourceDistributionResponse[]
>("api/mangasource/manga-distribution");
