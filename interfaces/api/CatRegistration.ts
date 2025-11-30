export enum CatSex {
  MALE = "macho",
  FEMALE = "fêmea",
}

export interface CatRegistrationDTO {
  name: string;
  birthDate?: string;
  picture?: string | Blob;
  sex: CatSex;
  observations?: string;
  vaccines?: string[];
  comorbidities?: string[];
  weight?: number;
  favorite?: boolean;
}
