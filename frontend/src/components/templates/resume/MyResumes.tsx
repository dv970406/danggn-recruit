import React from "react";
import { IResume } from "@/src/type/resume.interface";
import { IApplicant } from "@/src/type/applicant.interface";
import Title from "../../atomics/Title";
import MyResumeItem from "../../organisms/resume/MyResumeItem";

interface IMyResumes {
  appliedRecruitPostsPromise: Promise<{
    myResumes: IResume[];
    myInfo: IApplicant;
  }>;
}

// /resume/my
// 내가 지원한 채용공고의 리스트들을 띄워줌
const MyResumes = async ({ appliedRecruitPostsPromise }: IMyResumes) => {
  const { myInfo, myResumes } = await appliedRecruitPostsPromise;
  return (
    <section className="w-full gap-4 mt-8 column-box">
      <Title text={`${myInfo.name}님의 지원내역`} />
      <ul className="w-full gap-4 column-box">
        {myResumes.map((myResume) => (
          <MyResumeItem myResume={myResume} />
        ))}
      </ul>
    </section>
  );
};

export default MyResumes;
