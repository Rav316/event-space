export interface EventCreateDto {
  name: string;
  tags: string[];
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