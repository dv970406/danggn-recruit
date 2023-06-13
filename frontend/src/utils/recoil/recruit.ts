import { IGetRecruitPostsInput } from "@/src/type/recruit-post.interface";
import { atom } from "recoil";

export const filteringRecruitPostsState = atom<IGetRecruitPostsInput>({
  key: "filteringRecruitPostsState",
  default: {
    partName: "프론트엔드",
    careerType: "무관",
    keyword: "",
    pageParam: 0,
  },
});
