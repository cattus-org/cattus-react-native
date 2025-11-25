export enum CatSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export interface CatRegistrationDTO {
  name: string;
  birthDate?: string; // YYYY-MM-DD
  picture?: string; // uri
  sex: CatSex;
  observations?: string;
  vaccines?: string[];
  comorbidities?: string[];
  weight?: number;
  favorite?: boolean;
}
