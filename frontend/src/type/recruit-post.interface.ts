import { IPart } from "./part.interface";
import {
  ICoreEntityFormat,
  IInfiniteScrollingInput,
  IOutputFormat,
} from "./shared.interface";

export type TCareerType = "경력" | "신입" | "무관";
export type TWorkType = "정규직" | "계약직" | "인턴";

export interface IRecruitPost extends ICoreEntityFormat {
  title: string;
  content: string;
  part: IPart;
  careerType: TCareerType;
  workType: TWorkType;
}

export interface IGetRecruitPostsInput extends IInfiniteScrollingInput {
  keyword: string;
  partName: string;
  careerType: string;
}

export interface IGetAppliedRecruitPostsInput {
  applicantId: string;
}

// pagination
export interface IGetRecruitPosts extends IOutputFormat {
  recruitPosts: IRecruitPost[];
  isLastPage?: boolean;
}
