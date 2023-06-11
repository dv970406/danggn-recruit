import { redirect } from "next/navigation";
import { cache } from "react";

// 경로 내에서 여러번 fetch를 사용할 경우 cache를 쓰면 한번의 요청만 가고 데이터를 공유할 수 있음
export const getRecruitPost = cache(async (recruitPostId: string) => {
  const response = await fetch(
    process.env.SERVER_URL + `/recruit-post/${recruitPostId}`,
    { cache: "no-cache" }
  );

  const { ok, error, recruitPost } = await response.json();

  if (!ok) {
    redirect("/recruit");
  }

  return recruitPost;
});
