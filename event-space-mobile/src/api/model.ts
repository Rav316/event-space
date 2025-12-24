export interface ErrorResponse {
  timestamp: string;
  reason: any;
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