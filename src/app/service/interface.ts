import { AxiosResponse } from "axios";

export type ApiResponse<T> = AxiosResponse<BaseApiResponse<T>>;

export interface BaseApiResponse<T> {
  data: T;
  message: string;
  status: boolean;
  statusCode: number;
}
