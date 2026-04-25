export enum SourceId {
  MangaDex = 1,
  AsuraScans = 2,
  VortexScans = 3,
  Batoto = 4,
  SnowMachine = 5,
  Comick = 6,
}

export const SOURCE_OPTIONS = [
  { value: SourceId.MangaDex, label: "MangaDex" },
  { value: SourceId.AsuraScans, label: "AsuraScans" },
  { value: SourceId.VortexScans, label: "VortexScans" },
  { value: SourceId.Batoto, label: "Batoto" },
  { value: SourceId.SnowMachine, label: "SnowMachine" },
  { value: SourceId.Comick, label: "Comick" },
];

export interface ICreateSourceData {
  baseUrl: string;
  name: string;
}

export interface IPagedSourceResponse {
  baseUrl: string;
  id: number;
  name: string;
}

export interface ISourceDistributionResponse {
  mangaCount: number;
  sourceName: string;
}
