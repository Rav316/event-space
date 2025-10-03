import type { EventCategory } from '@/api/event-categories/model.ts';
import type { Space } from '@/api/spaces/model.ts';
import type { EventSort } from '@/types/event-sort.ts';

export interface EventCreateDto {
  name: string;
  tags?: string[];
  eventDate: string;
  startTime: string;
  endTime: string;
  deadline: string;
  space: number;
  shortDescription: string;
  description: string;
  category: number;
  steps?: EventStep[];
}

export interface EventStep {
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface EventCreateData {
  event: EventCreateDto;
  image: File | null;
}

export interface EventListDto {
  id: number;
  name: string;
  category: EventCategory;
  shortDescription: string;
  imageUrl?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: Space;
  participantQuantity: number;
  author?: string;
}

export interface EventFilter {
  name?: string;
  categories?: number[];
  tags?: string[];
  hasPlaces?: boolean;
  sort?: EventSort;
  page?: number;
}

export interface EventRequestData {
  filter: EventFilter;
  page: number;
}