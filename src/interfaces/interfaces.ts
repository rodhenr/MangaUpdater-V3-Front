export interface IManga {
  id: number;
  myAnimeListId: number;
  anilistId: number;
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

export interface IData {
  columns: IColumn[];
  rows: IRow[];
}

export interface IColumn {
  isEditable: boolean;
  field: string;
  headerName: string;
}

export interface IRow {
  id: number | string;
  [key: string]: string | number;
}
