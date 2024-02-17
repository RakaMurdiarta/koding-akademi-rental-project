import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";

export type loginFormData = {
  email: string;
  password: string;
};
export type registerFormData = {
  customer_type: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  cname: string;
};

export type loginResponse = string | null;

export class AuthServiceController {
  public async login(data: loginFormData): Promise<ApiResponse<loginResponse>> {
    console.log("login form data:", data);
    const endpoint = "/api/v1/auth/login";
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async register(data: registerFormData): Promise<any> {
    console.log("register form data:", data);
    const endpoint = "/api/v1/auth/register";
    const requestData = {
      customer_type: data.customer_type,
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      phone: data.phone,
    };

    const newRequestData = { ...requestData, cname: data.cname };

    try {
      const response = await axios.post(
        endpoint,
        data.cname !== "" ? newRequestData : requestData
      );
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
