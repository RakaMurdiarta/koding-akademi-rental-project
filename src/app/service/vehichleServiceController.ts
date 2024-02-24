import { AxiosError } from "axios";
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
  isAvailable: boolean;
  owner: Owner;
};

export type BaseVehicle = {
  id: string;
  model: string;
  year: number;
  identityNumber: string;
  ownerId: string;
  price: number;
  type: string;
  imageUrl: string;
  isAvailable: boolean;
};

interface Owner {
  id: string;
  customerId: string;
  customer: {
    phone: string;
    fullname: string;
  };
}

interface Customer {
  id: string;
  phone: string;
  email: string;
  password: string;
  customerType: string;
  fullname: string;
  cname: null | string;
}

export interface Rental {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  returnDate: string;
  amountDue: number;
  noOfDays: number;
  active: boolean;
  customer: Customer;
  vehicle: BaseVehicle;
}

export type Rent = {
  from: string;
  until: string;
  total: number;
  vehicle_id: string;
};

export interface AddVehicle {
  model: string;
  year?: number;
  identityNumber: string;
  type: string;
  price?: number;
  imageUrl: string;
}

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

export class vehicleServiceController {
  public async getAll(): Promise<BaseApiResponse<Vehicle[]>> {
    const endpoint = "/api/v1/vehicle/all";
    console.log("masuk");

    try {
      const response = await fetch(`${domainUrl}${endpoint}`);
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

  public async getById(id: string): Promise<BaseApiResponse<Vehicle>> {
    const endpoint = "/api/v1/vehicle/get";
    console.log("masuk");

    try {
      const response = await fetch(`${domainUrl}${endpoint}?id=${id}`);
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

  public async rent(data: Rent): Promise<ApiResponse<any>> {
    const endpoint = "/api/v1/customer/rent";
    try {
      const response = await axiosInstance.post(endpoint, data);
      console.log("data");
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }
  public async return(id: string): Promise<ApiResponse<any>> {
    const endpoint = "/api/v1/customer/return";
    try {
      const response = await axiosInstance.post(endpoint, { invoice_id: id });
      console.log("data");
      return response;
    } catch (err: any) {
      const error: AxiosError<BaseApiResponse<any>> = err;
      throw error.response?.data;
    }
  }

  public async getRented(jwt: string): Promise<BaseApiResponse<Rental[]>> {
    const endpoint = "/api/v1/customer/rent/list";

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

  public async getMy(jwt: string): Promise<BaseApiResponse<Rental[]>> {
    const endpoint = "/api/v1/customer/vehicle/list";

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

  public async add(data: AddVehicle): Promise<ApiResponse<any>> {
    const endpoint = "/api/v1/customer/post/vehicle";
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }
}
