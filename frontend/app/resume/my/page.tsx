import { Metadata, NextPage } from "next";
import React, { Suspense } from "react";
import { getAppliedRecruitPosts } from "../fetcher";
import MyResumes from "@/src/components/templates/resume/MyResumes";
import Loader from "@/src/components/atomics/Loader";

// cookies()를 사용하는 페이지라면 아래 작업이 필요함
// https://nextjs.org/docs/app/api-reference/functions/cookies
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#options
export const dynamic = "force-dynamic";

// 지원자 이름에 따라 동적으로 title 설정
export async function generateMetadata({}: IMyResumePage): Promise<Metadata> {
  const { myInfo } = await getAppliedRecruitPosts();

  return { title: myInfo.name ? `${myInfo.name}님의 지원내역` : "당근마켓" };
}

interface IMyResumePage {}

// /resume/my Page 렌더링 방식 : SSR
// 인증한 유저에 따라 다른 데이터를 보여줘야함. - 미리 만들어두는 것 불가(=SSG불가)
// 유저의 정보가 필요하다보니 generateStatic으로 정적으로 만들어두는 것도 사실상 불가
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
