import type { Building } from '@/api/buildings/model.ts';

export interface SpaceListDto {
  id: number;
  name: string;
  building: number;
  typeId: number;
  type: string;
  floor: number | null;
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

export interface SpaceType {
  id: number;
  name: string;
}

export interface SpaceCreateDto {
  name: string;
  building: number;
  type: number;
  floor?: number;
  capacity: number;
}

export interface SpaceEditDto {
  name: string;
  building: number;
  type: number;
  floor: number | null;
  capacity: number;
}

export interface SpaceDeleteImpactDto {
  events: number;
  reviews: number;
}