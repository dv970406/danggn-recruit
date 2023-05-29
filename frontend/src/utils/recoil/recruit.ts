import { atom } from "recoil";

export const filteringRecruitPostState = atom({
  key: "filteringRecruitPostState",
  default: {
    partName: "Frontend",
    careerType: "all",
    keyword: "",
  },
});
