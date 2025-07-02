export interface ICreateMangaSourceData {
  mangaId: number;
  sourceId: number;
  url: string;
}

export interface IPagedMangaSourceResponse {
  aditionalInfo: string | null;
  id: number;
  mangaId: number;
  mangaName: string;
  sourceId: number;
  sourceName: string;
  url: string;
}
