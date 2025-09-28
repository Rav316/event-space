export interface SpaceListDto {
  id: number;
  name: string;
  building: number;
  type: string;
  floor: number;
  capacity: number;
}

export interface SpaceFilter {
  building: number;
  name?: string;
  type?: number;
  minCapacity?: number;
  maxCapacity?: number;
}