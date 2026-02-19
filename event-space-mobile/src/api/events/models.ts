import { EventCategoryReadDto } from '@/src/api/event-categories/models';
import { SpaceReadDto } from '@/src/api/spaces/models';
import { UserEventAuthorDto } from '@/src/api/users/models';

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

export interface EventReadDto {
  id: number;
  name: string;
  category: EventCategoryReadDto;
  description: string;
  tags: string[];
  imageUrl?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  deadline?: string;
  space: SpaceReadDto;
  participantQuantity: number;
  registeredUsers: number;
  author?: UserEventAuthorDto;
  canRegister: boolean;
  canUnregister: boolean;
  isRegistered: boolean;
  isAttended: boolean;
  qrToken: string;
}

export interface EventStep {
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  id: number;
}