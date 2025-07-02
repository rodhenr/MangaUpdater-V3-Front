export interface IMangaBResponse {
  aniListId: number;
  chapters: IChapters[];
  coverUrl: string;
  myAnimeListId: number | null;
  titleEnglish: string;
  titleRomaji: string;
}

export interface IChapters {
  date: string;
  number: string;
  sourceId: number;
  url: string;
}

export interface IMangaResponse {
  aniListId: number;
  coverUrl: string;
  createdAt: Date;
  id: number;
  myAnimeListId: number;
  titleEnglish: string;
  titleRomaji: string;
}

export interface ICreateMangaData {
  coverUrl: string;
  myAnimeListId: number;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
}

export interface IUpdateMangaData {
  myAnimeListId: number;
  aniListId: number;
  titleRomaji: string;
  titleEnglish: string;
  coverUrl: string;
}
