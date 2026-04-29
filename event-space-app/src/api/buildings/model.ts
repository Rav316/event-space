export interface Building {
  id: number;
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface BuildingCreateDto {
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface BuildingEditDto {
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface BuildingDeleteImpactDto {
  spaces: number;
  events: number;
}
