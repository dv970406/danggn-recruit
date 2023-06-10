import React from "react";
import { Metadata, NextPage } from "next";
import { IRecruitPost } from "@/src/type/recruit-post.interface";
import { getRecruitPost } from "./fetcher";
import Markdown from "@/src/components/templates/recruit/Markdown";
import RecruitPostLayout from "./RecruitPostLayout";

interface IRecruitPostDetailPage {
  params: {
    recruitPostId: string;
  };
}

//
export async function generateMetadata({
  params,
}: IRecruitPostDetailPage): Promise<Metadata> {
  const recruitPostData = await getRecruitPost(params.recruitPostId);

  return { title: recruitPostData.title };
}

// /recruit/:recruitPostId Page 렌더링 방식 : SSG
// 많은 유저들이 조회할 수 있는 페이지이므로 SSR로 만들면 서버에 무리가 올수도.
// 데이터가 변하지 않는 페이지니까 SSG

/* @ts-expect-error Async Server Component */
const RecruitPostDetailPage: NextPage<IRecruitPostDetailPage> = async ({
  params,
}) => {
  const recruitPostData: IRecruitPost = await getRecruitPost(
    params.recruitPostId
  );

  return (
    /* @ts-expect-error Async Server Component */
    <RecruitPostLayout params={params}>
      <Markdown content={recruitPostData.content} />
    </RecruitPostLayout>
  );
};

export default RecruitPostDetailPage;
