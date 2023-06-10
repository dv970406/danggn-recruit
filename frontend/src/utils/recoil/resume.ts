import { IResume } from "@/src/type/resume.interface";
import { atom } from "recoil";

export const successAppliedResumeState = atom<IResume>({
  key: "successAppliedResumeState",
  default: {} as any,
});
