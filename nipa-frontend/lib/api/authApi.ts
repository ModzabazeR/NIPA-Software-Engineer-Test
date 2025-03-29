import { AxiosResponse } from "axios";
import axiosInstance from "../axios";
import { LoginResponse, RegisterResponse } from "../types";

export const postLogin = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRegister = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axiosInstance.post(
      "/auth/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
