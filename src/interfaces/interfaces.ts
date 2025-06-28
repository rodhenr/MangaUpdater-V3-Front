export interface IManga {
  id: number;
  myAnimeListId: number;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
  coverUrl: string;
  createdAt: Date;
}

export interface ISource {
  id: number;
  name: string;
  baseUrl: string;
}

export interface ISourceDistribution {
  mangaCount: number;
  sourceName: string;
}

export interface IMangaSource {
  id: number;
  mangaId: number;
  sourceId: number;
  url: string;
}

export interface IMangaSourceApi extends IMangaSource {
  mangaName: string;
  sourceName: string;
}

export interface IData {
  columns: IColumn[];
  rows: IRow[];
}

export interface IColumn {
  isAdd: boolean;
  isEditable: boolean;
  field: string;
  headerName: string;
}

export interface IRow {
  id: number;
  [key: string]: string | number | null;
}

export interface IMangaPost {
  coverUrl: string;
  myAnimeListId: number;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
}

export interface ISourcePost {
  name: string;
  baseUrl: string;
}

export interface IMangaSourcePost {
  mangaId: number;
  sourceId: number;
  url: string;
}

export interface IMetric {
  mangasCount: number;
  sourcesCount: number;
  RelationsCount: number;
  logsLastDayCount: number;
  queueCount: number;
}

export interface ILog {
  id: number;
  timestamp: Date;
  module: string;
  level: number;
  message: string;
  exception: string | null;
}

export interface IPagedQueryParams {
  pageNumber: number;
  pageSize: number;
}

export interface IPagedResult<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface IUserData {
  myAnimeListId: number | null;
  urlMyAnimeList: string | null;
  anilistId: number | null;
  urlAnilist: string | null;
  titleRomaji: string;
  titleEnglish: string;
  sourceLastChapterNumber: string | null;
  sourceLastChapterDate: Date | null;
  userLastChapterNumber: number;
  coverUrl: string;
  countryOfOrigin: string;
  status: string;
  score: number;
  genres: string[];
}

export interface IMangaData {
  coverUrl: string;
  myAnimeListId: number | null;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
  chapters: IChapters[];
}

export interface IChapters {
  sourceId: number;
  number: string;
  date: string;
  url: string;
}
