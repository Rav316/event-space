export interface ProgramListDto {
  id: number;
  name: string;
  preferredCategoryIds: number[];
}

export interface ProgramCreateDto {
  name: string;
  preferredCategoryIds: number[];
}

export interface ProgramEditDto {
  name: string;
  preferredCategoryIds: number[];
}

export interface ProgramDeleteImpactDto {
  users: number;
}
