export interface EventCategory {
  id: number;
  name: string;
}

export interface EventCategoryCountDto {
  id: number;
  name: string;
  eventCount: number;
}

export interface EventCategoryCreateDto {
  name: string;
}

export interface EventCategoryEditDto {
  name: string;
}

export interface EventCategoryDeleteImpactDto {
  events: number;
  reviews: number;
}
