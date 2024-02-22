import axios, { AxiosError } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";
import axiosInstance from "@/lib/axios";

export type userStatus = "false" | "pending" | "true";

export class userServiceController {
  public async isOwner(): Promise<ApiResponse<userStatus>> {
    const endpoint = "/api/v1/customer/isowner";
    try {
      const response = await axiosInstance.get(endpoint);
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }

  public async requestOwner(): Promise<ApiResponse<any>> {
    const endpoint = "/api/v1/customer/request/owner";
    try {
      const response = await axiosInstance.get(endpoint);
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }
}
