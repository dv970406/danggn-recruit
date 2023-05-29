import { IPart } from "./part.interface";
import { ICoreEntityFormat } from "./shared.interface";

export type TCareerType = "career" | "newbie" | "all";
export type TWorkType = "regular" | "contract" | "intern";
export interface IRecruitPost extends ICoreEntityFormat {
  title: string;
  content: string;
  part: IPart;
  careerType: TCareerType;
  workType: TWorkType;
}

export interface IGetRecruitPostsInput {
  keyword: string;
  partName: string;
  careerType: string;
}

export interface IGetAppliedRecruitPostsInput {
  applicantId: string;
}
