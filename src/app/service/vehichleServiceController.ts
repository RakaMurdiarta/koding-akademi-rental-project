import axios, { AxiosError } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";
import axiosInstance from "@/lib/axios";

export type Vehicle = {
  id: string;
  model: string;
  year: number;
  identityNumber: string;
  ownerId: string;
  price: number;
  type: string;
  imageUrl: string;
};

export class vehicleServiceController {
  public async getAll(): Promise<ApiResponse<Vehicle[]>> {
    const endpoint = "/api/v1/vehicle/all";
    try {
      const response = await axiosInstance.get(endpoint);
      console.log("data");
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }
  public async getById(id: string): Promise<ApiResponse<Vehicle>> {
    const endpoint = "/api/v1/vehicle/get";
    try {
      const response = await axiosInstance.get(endpoint, {
        params: { id: id },
      });
      console.log("data");
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }
}
