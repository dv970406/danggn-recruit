import { IGetRecruitPostsInput } from "@/src/type/recruit-post.interface";
import { atom } from "recoil";

export const filteringRecruitPostState = atom<IGetRecruitPostsInput>({
  key: "filteringRecruitPostState",
  default: {
    partName: "프론트엔드",
    careerType: "무관",
    keyword: "",
    pageParam: 1,
  },
});
