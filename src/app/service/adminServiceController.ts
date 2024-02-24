import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";

export type RegisterAdmin = {
  username: string;
  password: string;
};

export type RegisterAdminResponse = {
  id: string;
  username: string;
  password: string;
};

type ApproveOwner = {
  customerid: string;
};

export type CustomerListData = {
  id: string;
  customerId: string;
  status: string;
};

export type CustomerList = {
  data: CustomerListData[];
};

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

export class adminServiceController {
  public async register(
    data: RegisterAdmin
  ): Promise<ApiResponse<RegisterAdminResponse>> {
    console.log("login form data:", data);
    const endpoint = "/api/v1/auth/admin/register";
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }

  public async approveOwner(id: string): Promise<ApiResponse<string>> {
    const data: ApproveOwner = {
      customerid: id,
    };
    const endpoint = "/api/v1/admin/accept/request";
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }

  public async getList(
    jwt: string
  ): Promise<BaseApiResponse<CustomerListData[]>> {
    const endpoint = "/api/v1/admin/owner/register/list";

    try {
      const response = await fetch(`${domainUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data");

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err: any) {
      throw new Error(err.message || "Something went wrong");
    }
  }
}
