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
// 아래는 상위페이지에서 이미 한 설명임
// 데이터가 변하지 않는 페이지이므로 SSG로 만들것임
// 그런데 동적인 파라미터값을 갖는 페이지라서 NextJS는 SSR로 처리하려고 할 것임
// 하지만 동적인 파라미터라고 해도 해당 경로의 페이지 자체는 100개 이하일 것임(그것보다 낮을 가능성이 더 높음)
// 따라서 generateStatic으로 NextJS가 해당 경로의 페이지들을 SSG로 렌더링해놓도록 만들자.
// ?(사실 이 방식은 실전에서는 불가능함. 왜? 채용공고는 꽤 자주 열리고 닫힘. 따라서 수시로 변하는터라 정적인 페이지를 만들어두는 것은 적합하지 않은 방식임.
// ?SSR이 적당하긴한데 여러 기능 사용을 위해서 generateParams에 100개의 id를 던져서 100개의 페이지가 변하지 않는다고 가정하고 정적으로 미리 만들어두는 것임)

// 위 주석과 같은 이유로 generateStaticParams 사용하려고 했는데 현재 NextJS13 내부 이슈로 인해 generateStaticParams 사용하면 안됨 => https://velog.io/@jeonbyeongmin/%EC%95%84%EC%A7%81-Next.js-13-%EC%9C%BC%EB%A1%9C-%EC%A0%95%EC%A0%81-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94
// 따라서 우선 SSR로 처리
// export function generateStaticParams() {
//   const idsOneToHundred = new Array(30).fill(undefined).map((_, idx) => ({
//     // index니까 +1
//     recruitPostId: idx + 1 + "", // string으로 넘겨야함
//   }));
//   return idsOneToHundred;
// }

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
