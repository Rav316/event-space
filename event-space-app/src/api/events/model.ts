import type { EventCategory } from '@/api/event-categories/model.ts';
import type { Space } from '@/api/spaces/model.ts';
import type { EventSortCategory } from '@/constants/event-sort-categories.ts';
import type { EventPeriod } from '@/constants/event-periods.ts';
import type { UserEventAuthorDto } from '@/api/users/model.ts';

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
  participantQuantity: number;
  steps?: EventStepCreateDto[];
}

export interface EventStepCreateDto {
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface EventStep extends EventStepCreateDto {
  id: number;
}

export interface EventCreateData {
  event: EventCreateDto;
  image: File | null;
}

export interface EventEditData {
  eventId: number;
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
  deadline?: string;
  space: Space;
  registeredUsers: number;
  participantQuantity: number;
  author?: string;
  isRegistered: boolean;
  canRegister: boolean;
  canUnregister: boolean;
  isAttended: boolean;
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
  deadline?: string;
  space: Space;
  participantQuantity: number;
  registeredUsers: number;
  author?: UserEventAuthorDto;
  canRegister: boolean;
  canUnregister: boolean;
  isRegistered: boolean;
  isAttended: boolean;
  qrToken?: string;
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

export interface EventMyFilter {
  name: string;
  category?: number;
}

export interface EventRequestData<T> {
  filter: T;
  page: number;
}

export interface EventListForUserDto {
  id: number;
  name: string;
  category: EventCategory;
  imageUrl?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  space: Space;
  qrToken: string;
  attended: boolean;
  registeredAt: string;
}

export interface EventListMyDto {
  id: number;
  name: string;
  category: EventCategory;
  shortDescription: string;
  imageUrl?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  deadline?: string;
  space: Space;
  registeredUsers: number;
  participantQuantity: number;
  author?: string;
}

export interface EventDetailsDto {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  category: number;
  registeredUsers: number;
  participantQuantity: number;
  tags: string[];
  eventDate: string;
  startTime: string;
  endTime: string;
  deadline: string;
  steps: EventStep[];
  building: number;
  space: number;
  imageUrl: string;
}