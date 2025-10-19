import type { Building } from '@/api/buildings/model.ts';

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

export interface Space {
  id: number;
  name: string;
  capacity: number;
  building: Building;
}
