import axios, { AxiosError } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";

const API_URL = "http://localhost:3000/api/v1";

export type loginFormData = {
  email: string;
  password: string;
};
export type registerFormData = {
  email: string;
  fname: string;
  lname: string;
  password: string;
  phone: string;
  customer_type: string;
};

export type loginResponse = string | null;

export class AuthServiceController {
  public async login(data: loginFormData): Promise<ApiResponse<loginResponse>> {
    console.log("login form data:", data);
    const endpoint = "/auth/login";
    const url = API_URL + endpoint;
    console.log(url);
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async register(
    data: registerFormData
  ): Promise<ApiResponse<loginResponse>> {
    console.log("register form data:", data);
    const endpoint = "/auth/register";
    const url = API_URL + endpoint;
    try {
      const response = await axios.post(url, {
        data,
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
