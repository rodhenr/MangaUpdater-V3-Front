export interface IManga {
  id: number;
  myAnimeListId: number;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
}

export interface ISource {
  id: number;
  name: string;
  baseUrl: string;
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

export interface ILog {
  id: number;
  timestamp: Date;
  module: string;
  level: number;
  message: string;
  exception: string | null;
}

export interface IUserData {
  myAnimeListId: number | null;
  urlMyAnimeList: string | null;
  anilistId: number | null;
  urlAnilist: string | null;
  titleRomaji: string;
  titleEnglish: string;
  sourceLastChapterNumber: number | null;
  sourceLastChapterDate: Date | null;
  userLastChapterNumber: number;
  coverUrl: string;
}
