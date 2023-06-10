import { IApplicant } from "./applicant.interface";
import { IRecruitPost } from "./recruit-post.interface";
import { ICoreEntityFormat } from "./shared.interface";

export interface IResume extends ICoreEntityFormat {
  pdfLink: string;
  recruitPost: IRecruitPost;
  applicant: IApplicant;
}

export interface ICreateResumeInput {
  recruitPostId: string;
  name: string;
  phoneNumber: string;
  email: string;
  pdfFile: File;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
}
