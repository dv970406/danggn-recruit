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
// 인증한 유저에 따라 다른 데이터를 보여줘야함. + 페이지가 몇개가 될지 모름 - 미리 만들어두는 것 불가(=SSG불가)
// 유저의 정보가 필요하다보니 generateStatic으로 정적으로 만들어두는 것도 사실상 불가
// CSR로 해도 되긴 하지만 최대한 서버측 렌더링 활용

/* @ts-expect-error Async Server Component */
const ResumeDetailPage: NextPage<IResumeDetailPage> = async ({ params }) => {
  const resumeData = await getMyResume(params.resumeId);
  return <MyResume resumeData={resumeData} />;
};

export default ResumeDetailPage;
