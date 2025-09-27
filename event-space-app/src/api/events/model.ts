export interface EventCreateDto {
  name: string;
  tags: string[];
  eventDate: Date;
  startTime: string;
  endTIme: string;
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
  description: string;
}