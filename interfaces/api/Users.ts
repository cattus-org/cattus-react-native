import { ICompany } from "./Companies";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  access_level: string;
  company: ICompany;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  deletedAt: Date;
}
