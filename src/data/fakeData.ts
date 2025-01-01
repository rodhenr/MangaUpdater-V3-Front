import { IRow } from "../interfaces/interfaces";

export const mockManga: IRow[] = [
  {
    id: 1,
    myAnimeListId: 147324,
    anilistId: 109957,
    titleRomaji: "Dubeon Saneun Ranker",
    titleEnglish: "Second Life Ranker",
  },
  {
    id: 2,
    myAnimeListId: 13,
    anilistId: 30013,
    titleRomaji: "One Piece",
    titleEnglish: "One Piece",
  },
  {
    id: 3,
    myAnimeListId: 157888,
    anilistId: 163824,
    titleRomaji: "Cheolhyeolgeomga Sanyanggaeui Hoegwi",
    titleEnglish: "Revenge of the Baskerville Bloodhound",
  },
];

export const mockSource: IRow[] = [
  { id: 1, name: "MangaDex", baseUrl: "https://api.mangadex.org/manga/" },
  { id: 2, name: "AsuraScans", baseUrl: "https://asuracomic.net/series/" },
];

export const mockMangaSource: IRow[] = [
  {
    id: 1,
    mangaId: 1,
    sourceId: 1,
    url: "1ffca916-3ad7-46d2-9591-a9b39e639971",
  },
  {
    id: 2,
    mangaId: 2,
    sourceId: 1,
    url: "a1c7c817-4e59-43b7-9365-09675a149a6f",
  },

  {
    id: 3,
    mangaId: 3,
    sourceId: 2,
    url: "revenge-of-the-iron-blooded-sword-hound-da0c5e71",
  },
];

export const mockLogs: IRow[] = [
  { id: 1, status: "success", source: "system", payload: '{"data": "log 1"}' },
  { id: 2, status: "error", source: "user", payload: '{"error": "log 2"}' },
  {
    id: 3,
    status: "warning",
    source: "system",
    payload: '{"warning": "log 3"}',
  },
];
