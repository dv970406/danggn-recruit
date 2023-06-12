import { getTokenInCookie } from "@/src/utils/func/cookie";
import { redirect } from "next/navigation";
import { cache } from "react";

// generateMetadata와 page에서 2번 불리므로 cache사용
export const getAppliedRecruitPosts = cache(async () => {
  const token = getTokenInCookie();

  const response = await fetch(process.env.SERVER_URL + `/resume/my`, {
    cache: "no-cache",
    // SSR하에서는 쿠키에 들어있는 토큰을 직접 넣어줘야함(브라우저 측에 저장된 쿠키에 접근할 수 없기 때문)
    ...(token && {
      headers: {
        token: token || "",
      },
    }),
  });

  const { ok, error, myInfo, myResumes } = await response.json();

  // 토큰이 조작되었건, Guard는 통과했지만 Resume리스트를 불러올 때 문제가 생겼건 다시 auth페이지로 돌려보냄
  if (!ok || error) {
    redirect("/resume/auth");
  }

  return { myInfo, myResumes };
});
