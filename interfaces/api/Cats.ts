import { ICompany } from "./Companies";
import { IUser } from "./Users";

export interface ICat {
  id: number;
  name: string;
  birthDate: Date;
  picture: string;
  sex: "macho" | "femea";
  observations?: string;
  vaccines?: string[];
  commorbidities?: string[];
  weight?: number;
  favorite?: boolean;
  status?: CatStatus;
  company?: ICompany;
  createdBy?: IUser;
  updatedBy?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  deletedAt?: Date;
}

export enum CatStatus {
  OK = "ok",
  ALERT = "alert",
  DANGER = "danger",
}
