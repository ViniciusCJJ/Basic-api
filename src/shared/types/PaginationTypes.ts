export type IndexResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};

export type IndexRequest<T> = {
  page?: number;
  limit?: number;
  filters: Partial<T>;
};
