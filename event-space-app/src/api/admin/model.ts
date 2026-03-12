export interface AdminStatisticsDto {
  totalUsers: number;
  activeUsers: number;
  totalEvents: number;
  activeEvents: number;
  totalComplaints: number;
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