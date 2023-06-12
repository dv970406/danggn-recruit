"use client";
import React from "react";
import Title from "../../atomics/Title";
import MyResumeItem from "../../organisms/resume/MyResumeItem";
import NoData from "../../organisms/shared/NoData";
import { useGetAppliedRecruitPosts } from "@/src/clients/mutations/resume";

interface IMyResumes {}

// /resume/my
// 내가 지원한 채용공고의 리스트들을 띄워줌
const MyResumes = async ({}: IMyResumes) => {
  const {
    data: { myInfo, myResumes },
  } = useGetAppliedRecruitPosts();
  return (
    <section className="w-full gap-4 mt-8 column-box">
      <Title text={`${myInfo.name}님의 지원내역`} />
      <ul className="w-full gap-4 column-box">
        {myResumes.map((myResume) => (
          <MyResumeItem myResume={myResume} />
        ))}
        {/* 데이터가 있어야 지원자 정보가 있기 때문에 NoData인 상황이 존재할 수 없긴 함 */}
        {myResumes.length === 0 && <NoData />}
      </ul>
    </section>
  );
};

export default MyResumes;
