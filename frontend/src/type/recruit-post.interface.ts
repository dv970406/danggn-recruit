import { IGetPart } from "./part.interface";

export interface IGetRecruitPost {
  id: string;
  title: string;
  content: string;
  part: IGetPart;
  careerType: "career" | "newbie" | "all";
  workType: "regular" | "contract" | "intern";
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetRecruitPostsInput {
  keyword: string;
  partName: string;
  careerType: string;
}

export type ICreateRecruitPost = Omit<
  IGetRecruitPost,
  "id" | "createdAt" | "updatedAt"
>;

export type IPatchRecruitPost = Partial<IGetRecruitPost>;

export type IDeleteRecruitPost = Pick<IGetRecruitPost, "id">;
