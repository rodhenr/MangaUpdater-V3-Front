export interface IUserMangaData {
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
