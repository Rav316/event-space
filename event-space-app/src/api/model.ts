export interface PageResponse<T> {
  content: T[];
  metadata: PageMetadata;
}

export interface SliceResponse<T> {
  content: T[];
  metadata: SliceMetadata;
}

export interface Metadata {
  page: number;
  size: number;
}

export interface SliceMetadata extends Metadata {
  hasNext: boolean;
}

export interface PageMetadata extends Metadata {
  totalElements: number;
}