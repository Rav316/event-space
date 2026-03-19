export interface FacultyListDto {
  id: number;
  name: string;
}

export interface FacultyCreateDto {
  name: string;
  building: number;
}

export interface FacultyEditDto {
  name: string;
  building: number;
}

export interface FacultyDeleteImpactDto {
  users: number;
}
