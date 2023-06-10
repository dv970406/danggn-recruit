import { Metadata, NextPage } from "next";
import React, { Suspense } from "react";
import { getAppliedRecruitPosts } from "../fetcher";
import MyResumes from "@/src/components/templates/resume/MyResumes";
import Loader from "@/src/components/atomics/Loader";

// 지원자 이름에 따라 동적으로 title 설정
export async function generateMetadata({}: IMyResumePage): Promise<Metadata> {
  const { myInfo } = await getAppliedRecruitPosts();

  return { title: myInfo.name ? `${myInfo.name}님의 지원내역` : "당근마켓" };
}

interface IMyResumePage {}

// /resume/my Page 렌더링 방식 : SSR
// 인증한 유저에 따라 다른 데이터를 보여줘야함. - 미리 만들어두는 것 불가(=SSG불가)
const MyResumePage: NextPage<IMyResumePage> = ({}) => {
  // Suspense 활용을 위해 Promise는 자식 컴포넌트에서 await할 것
  const appliedRecruitPostsPromise = getAppliedRecruitPosts();

  return (
    <Suspense fallback={<Loader />}>
      {/* @ts-expect-error Async Server Component */}
      <MyResumes appliedRecruitPostsPromise={appliedRecruitPostsPromise} />
    </Suspense>
  );
};

export default MyResumePage;
