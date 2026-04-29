export interface ProgramListDto {
  id: number;
  name: string;
}

export interface ProgramCreateDto {
  name: string;
  building: number;
}

export interface ProgramEditDto {
  name: string;
  building: number;
}

export interface ProgramDeleteImpactDto {
  users: number;
}
