import { QueryFunction } from "@tanstack/react-query";
import { apiClientDatabase } from "../axiosClient";
import { IPagedQueryParams, IPagedResult } from "./utils.types";

export function createPagedQuery<T>(
  endpoint: string
): QueryFunction<IPagedResult<T>, readonly [string, IPagedQueryParams]> {
  return async ({ queryKey }) => {
    const [, { pageNumber, pageSize }] = queryKey;

    const response = await apiClientDatabase.get<IPagedResult<T>>(endpoint, {
      params: { pageNumber, pageSize },
    });

    return response.data;
  };
}
