export interface PageResponse<T> {
  content: T[],
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  size: number;
  totalElements: number;
}