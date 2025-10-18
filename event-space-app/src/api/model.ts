export interface PageResponse<T> {
  content: T[];
  metadata: PageMetadata;
}

export interface SliceResponse<T> {
  content: T[];
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  size: number;
}

export interface PageMetadata extends Metadata {
  totalElements: number;
}