import { BuildingReadDto } from '@/src/api/buildings/models';

export interface SpaceReadDto {
  id: number;
  name: string;
  capacity: number;
  building: BuildingReadDto;
}