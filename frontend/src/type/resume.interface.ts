import { IRecruitPost } from "./recruit-post.interface";
import { ICoreEntityFormat } from "./shared.interface";

export interface IResume extends ICoreEntityFormat {
  name: string;
  phoneNumber: string;
  email: string;
  pdfLink: string;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
  recruitPost: IRecruitPost;
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
