import axios, { AxiosInstance } from "axios";

const DEV_SERVER_URL = process.env.NEXT_PUBLIC_DEV_SERVER_URL;
const PROD_SERVER_URL = process.env.NEXT_PUBLIC_PROD_SERVER_URL;

export const customAxios: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? DEV_SERVER_URL : PROD_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
