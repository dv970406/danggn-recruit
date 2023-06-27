import React from "react";
import { IResume } from "@/src/type/resume.interface";
import { IApplicant } from "@/src/type/applicant.interface";
import Title from "../../atomics/Title";
import MyResumeItem from "../../organisms/resume/MyResumeItem";
import NoData from "../../organisms/shared/NoData";
import ListWrapper from "../../molecules/boxes/ListWrapper";

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
      <ListWrapper>
        {myResumes.map((myResume) => (
          <MyResumeItem myResume={myResume} />
        ))}
        {/* 데이터가 있어야 지원자 정보가 있기 때문에 NoData인 상황이 존재할 수 없긴 함 */}
        {myResumes.length === 0 && <NoData />}
      </ListWrapper>
    </section>
  );
};

export default MyResumes;
