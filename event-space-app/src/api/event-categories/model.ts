export interface EventCategory {
  id: number;
  name: string;
  color: string;
}

export interface EventCategoryCountDto {
  id: number;
  name: string;
  color: string;
  eventCount: number;
}

export interface EventCategoryCreateDto {
  name: string;
  color: string;
}

export interface EventCategoryEditDto {
  name: string;
  color: string;
}

export interface EventCategoryDeleteImpactDto {
  events: number;
  reviews: number;
}
