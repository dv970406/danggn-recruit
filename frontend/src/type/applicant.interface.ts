import { ICoreEntityFormat } from "./shared.interface";

export interface IApplicant extends ICoreEntityFormat {
  name: string;
  phoneNumber: string;
  email: string;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
  resumes: string;
}
export interface IGetAuthInput {
  name: string;
  email: string;
  phoneNumber: string;
}
export interface IGetAuthOutput {
  message: string;
}
