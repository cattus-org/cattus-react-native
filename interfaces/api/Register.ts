export interface IRegisterUser {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  name: string;
  email: string;
  id: number;
  access_level: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deleted: boolean;
}
