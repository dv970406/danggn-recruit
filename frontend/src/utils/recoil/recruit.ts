import { atom } from "recoil";

export const filteringRecruitPostState = atom({
  key: "filteringRecruitPostState",
  default: {
    part: "frontend",
    careerType: "all",
    keyword: "",
  },
});
