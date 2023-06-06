import { IGetAuthInput } from "@/src/type/applicant.interface";
import { customAxios } from "../axios";

export const getAuth = async (getAuthInput: IGetAuthInput) => {
  const { data } = await customAxios.post("/applicant/auth", getAuthInput);

  return data;
};
