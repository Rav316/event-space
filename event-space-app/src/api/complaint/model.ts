export interface ComplaintType {
  id: number;
  name: string;
}

export interface ComplaintCreateDto {
  targetType: number;
  targetId: number;
  complaintType: number;
  description: string;
}