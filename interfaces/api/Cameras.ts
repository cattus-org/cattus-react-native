export interface ICamera {
  id: number;
  url: string;
  name: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date | null;
}
