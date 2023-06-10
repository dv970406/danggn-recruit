import React from "react";
import { Metadata, NextPage } from "next";
import { getRecruitPost } from "../fetcher";
import RecruitPostLayout from "../RecruitPostLayout";
import ApplyResume from "@/src/components/templates/recruit/ApplyResume";

interface IApplyPage {
  params: {
    recruitPostId: string;
  };
}

export async function generateMetadata({
  params,
}: IApplyPage): Promise<Metadata> {
  const recruitPostData = await getRecruitPost(params.recruitPostId);

  return { title: recruitPostData.title };
}

// /recruit/:recruitPostId/apply Page 렌더링 방식 : SSG
// 데이터가 변하지 않는 페이지이므로 SSG

/* @ts-expect-error Async Server Component */
const ApplyPage: NextPage<IApplyPage> = async ({ params }) => {
  return (
    /* @ts-expect-error Async Server Component */
    <RecruitPostLayout params={params}>
      <ApplyResume recruitPostId={params.recruitPostId} />
    </RecruitPostLayout>
  );
};

export default ApplyPage;
