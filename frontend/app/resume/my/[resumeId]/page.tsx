import MyResume from "@/src/components/templates/resume/MyResume";
import { Metadata } from "next";
import React from "react";
import { getMyResume } from "./fetcher";

interface IResumeDetailPage {
  params: {
    resumeId: string;
  };
}

// 지원자 이름에 따라 동적으로 title 설정
export async function generateMetadata({
  params,
}: IResumeDetailPage): Promise<Metadata> {
  const { recruitPost } = await getMyResume(params.resumeId);

  return { title: recruitPost.title };
}

// /resume/my/:resumeId Page 렌더링 방식 : SSR
// 바뀌는 데이터가 아니긴 하지만 빌드된 지원서 페이지가 몇개가 될지 모르므로 SSG는 안됨
// CSR로 해도 되긴 하지만 최대한 서버측 렌더링 활용

/* @ts-expect-error Async Server Component */
const ResumeDetailPage: NextPage<IResumeDetailPage> = async ({ params }) => {
  const resumeData = await getMyResume(params.resumeId);
  return <MyResume resumeData={resumeData} />;
};

export default ResumeDetailPage;
