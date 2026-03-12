export interface ComplaintType {
  id: number;
  name: string;
}

export interface ComplaintCreateDto {
  target: string;
  complaintType: number;
  description: string;
}