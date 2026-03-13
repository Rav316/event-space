import type { EventCategory } from '@/api/event-categories/model.ts';

export interface ComplaintReviewRequest {
  comment: string;
  resolved: boolean;
}

export interface ComplaintListDto {
  id: number;
  authorFirstName: string;
  authorLastName: string;
  authorId: number;
  targetType: 'EVENT_REVIEW' | 'EVENT';
  targetId: number;
  targetSnapshot: string;
  complaintTypeName: string;
  description: string;
  complaintDate: string;
  status: number;
}

export interface EventAdminListDto {
  id: number;
  name: string;
  author: string;
  category: EventCategory;
  eventDate: string;
  registeredUsers: number;
  participantQuantity: number;
  status: number;
}

export interface AdminListFilter {
  page: number;
  size: number;
  search?: string;
}

export interface AdminStatisticsDto {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  activeEvents: number;
  pendingComplaints: number;
  latestUsers: UserPreviewDto[];
  latestActiveEvents: EventPreviewDto[];
}

export interface UserPreviewDto {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  active: boolean;
}

export interface EventPreviewDto {
  id: number;
  name: string;
  eventDate: string;
  participantQuantity: number;
  registeredUsers: number;
  authorFirstName: string;
  authorLastName: string;
}

export interface BuildingReadDto {
  id: number;
  name: string;
  address: string;
}

export interface EventCategoryReadDto {
  id: number;
  name: string;
  color: string;
}

export interface FacultyReadDto {
  id: number;
  name: string;
  building: string;
}
