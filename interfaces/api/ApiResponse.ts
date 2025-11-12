export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  timeStamp?: Date;
  path?: string;
  message: string | string[];
  data?: T;
}
