import type { EventCategory } from '@/api/event-categories/model.ts';
import type { Space } from '@/api/spaces/model.ts';
import type { EventSortCategory } from '@/constants/event-sort-categories.ts';
import type { EventPeriod } from '@/constants/event-periods.ts';

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
  steps?: EventStepCreateDto[];
}

export interface EventStepCreateDto {
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface EventStep {
  id: number;
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
  isRegistered: boolean;
}

export interface EventReadDto {
  id: number;
  name: string;
  category: EventCategory;
  description: string;
  tags: string[];
  imageUrl?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: Space;
  participantQuantity: number;
  author?: string;
  isRegistered: boolean;
  steps: EventStep[];
}

export interface EventFilter {
  name: string;
  categories: number[];
  tags: string[];
  hasPlaces?: boolean;
  sort?: EventSortCategory;
  period: EventPeriod;
  page?: number;
}

export interface EventRequestData {
  filter: EventFilter;
  page: number;
}