import { EventCategoryReadDto } from '@/src/api/event-categories/models';
import { SpaceReadDto } from '@/src/api/spaces/models';

export interface EventQrInfoDto {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  space: string;
  address: string;
}

export interface EventListPreviewDto {
  id: number;
  name: string;
  category: EventCategoryReadDto;
  imageUrl: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: SpaceReadDto;
}

export interface EventPreviewFilter {
  name?: string;
  categories?: number[];
  sort?: string;
  period?: string;
}