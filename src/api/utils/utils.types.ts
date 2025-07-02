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
