import { postCommand } from "../utils/utils.postQuery";
import { ICreateSourceData } from "./source.types";

export const postSource = (source: ICreateSourceData) =>
  postCommand<ICreateSourceData, void>("api/source", source);
