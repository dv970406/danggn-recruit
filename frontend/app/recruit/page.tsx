import RandomBall from "@/src/components/templates/recruit/RandomBall";
import React, { Suspense } from "react";
import RecruitPosts from "@/src/components/templates/recruit/RecruitPosts";
import { INIT_RECRUIT_POSTS_QUERY_STRING } from "@/src/utils/constants/recruit-post";

export const metadata = {
  title: "채용",
};

const getParts = async () => {
  // 바뀔 일 없는 데이터라 SSG방식 렌더링을 위해 - force-cache로 사용
  // 그런데 아래 getRecruitPosts이 ISR방식이여서 30분마다 재생성될듯?
  const response = await fetch(process.env.SERVER_URL + `/part`, {
    cache: "force-cache",
  });

  const { ok, error, parts } = await response.json();
  if (!ok) {
    throw new Error(error);
  }

  return parts;
};

const getRecruitPosts = async () => {
  // 채용공고는 실시간으로 갱신은 필요없고 간혹 업데이트 해주면 되겠다.
  // 따라서 ISR - revalidate로 30분마다 HTML파일 재생성
  // 단 테스트 확인을 위해서 5초로 설정
  const response = await fetch(
    process.env.SERVER_URL + `/recruit-post?${INIT_RECRUIT_POSTS_QUERY_STRING}`,
    {
      next: {
        revalidate: 5, //60 * 30 // === 30분
      },
    }
  );

  const { ok, error, recruitPosts } = await response.json();
  if (!ok) {
    throw new Error(error);
  }

  return recruitPosts;
};

// /recruit Page 렌더링 방식 : ISR + CSR
// parts데이터만 있다면 변하지 않으므로 SSG로 해도 되는데 recruitPosts는 바뀔 수 있음.
// 그렇다고 유저 데이터처럼 실시간 데이터가 필요한 것은 아니라 주기적으로 페이지를 갱신하는 ISR이면 될듯.
// 그리고 RecruitPosts는 Select를 통해 필터링을 거쳐서 데이터가 바뀔 수 있으므로 CSR까지
const RecruitPage = async () => {
  const partsPromise = getParts();
  const recruitPostsPromise = getRecruitPosts();

  // 데이터 병렬요청
  const [partsData, recruitPostsData] = await Promise.all([
    partsPromise,
    recruitPostsPromise,
  ]);

  return (
    <article className="gap-4 column-box">
      <RandomBall partsData={partsData} />

      <RecruitPosts
        partsData={partsData}
        initRecruitPostsData={recruitPostsData}
      />
    </article>
  );
};

export default RecruitPage;
