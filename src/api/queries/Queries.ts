import { QueryFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  IChaptersLog,
  ILog,
  IManga,
  IMangaData,
  IMangaSourceApi,
  IMangaUpdate,
  IMetric,
  IPagedQueryParams,
  IPagedResult,
  ISource,
  ISourceDistribution,
  IUserData,
} from "../../interfaces/interfaces";
import { apiClientDatabase, apiClientUser } from "../axiosClient";

export const fetchMetrics = async (): Promise<IMetric> => {
  const response = await apiClientDatabase.get<IMetric>("api/metrics");

  return response.data;
};

export const fetchLogs: QueryFunction<
  IPagedResult<ILog>,
  readonly [string, IPagedQueryParams]
> = async ({ queryKey }) => {
  const [, { pageNumber, pageSize }] = queryKey;

  const response = await apiClientDatabase.get<IPagedResult<ILog>>("api/log", {
    params: { pageNumber, pageSize },
  });

  return response.data;
};

export const fetchMangas: QueryFunction<
  IPagedResult<IManga>,
  readonly [string, IPagedQueryParams]
> = async ({ queryKey }) => {
  const [, { pageNumber, pageSize }] = queryKey;

  const response = await apiClientDatabase.get<IPagedResult<IManga>>(
    "api/manga",
    {
      params: { pageNumber, pageSize },
    }
  );

  return response.data;
};

export const fetchMangaById = async (
  id: number
): Promise<IMangaData | null> => {
  const response: AxiosResponse = await apiClientDatabase.get(
    `api/manga/${id}`
  );

  if (
    response.status === 204 ||
    typeof response.data !== "object" ||
    response.data === null
  ) {
    return null;
  }

  return response.data as IMangaData;
};

export const fetchSources = async (): Promise<ISource[]> => {
  const response = await apiClientDatabase.get<ISource[]>("api/source");

  return response.data;
};

export const fetchSourceDistribution = async (): Promise<
  ISourceDistribution[]
> => {
  const response = await apiClientDatabase.get<ISourceDistribution[]>(
    "api/mangaSource/manga-distribution"
  );

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

export const fetchChaptersLog: QueryFunction<
  IPagedResult<IChaptersLog>,
  readonly [string, IPagedQueryParams]
> = async ({ queryKey }) => {
  const [, { pageNumber, pageSize }] = queryKey;

  const response = await apiClientDatabase.get<IPagedResult<IChaptersLog>>(
    "api/chapters",
    {
      params: { pageNumber, pageSize },
    }
  );

  return response.data;
};

export const updateMangaData = async (
  mangaId: number,
  data: IMangaUpdate
): Promise<void> => {
  const response = await apiClientDatabase.put<void>(
    `api/manga/${mangaId}`,
    data
  );

  return response.data;
};
