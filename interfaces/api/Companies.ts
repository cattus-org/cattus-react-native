import { IUser } from "./Users";

export interface ICompany {
  id: number;
  name: string;
  cnpj: string;
  logotype: string;
  phone: string;
  responsible: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  deletedAt: Date;
}
