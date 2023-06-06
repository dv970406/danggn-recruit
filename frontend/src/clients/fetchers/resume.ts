import { IGetAuthInput } from "@/src/type/applicant.interface";
import { customAxios } from "../axios";

export const getAppliedRecruitPosts = async () => {
  const { data } = await customAxios.get(`/resume/my`);

  return data;
};

// export const getMyResume = async (resumeId?: string) => {
//   const { data } = await customAxios.get(`/resume/${resumeId}`);
//   return data;
// };

export const createResume = async (createResumeInput: FormData) => {
  const { data } = await customAxios.postForm("/resume", createResumeInput);
  return data;
};
