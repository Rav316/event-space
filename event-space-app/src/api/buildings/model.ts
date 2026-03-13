export interface Building {
  id: number;
  name: string;
  address: string;
}

export interface BuildingCreateDto {
  name: string;
  address: string;
}

export interface BuildingEditDto {
  name: string;
  address: string;
}

export interface BuildingDeleteImpactDto {
  faculties: number;
  users: number;
  spaces: number;
  events: number;
}
