import { getTokenInCookie } from "@/src/utils/func/cookie";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getMyResume = cache(async (resumeId: string) => {
  const token = getTokenInCookie();

  const response = await fetch(
    process.env.SERVER_URL + `/resume/my/${resumeId}`,
    {
      cache: "no-cache",
      // SSR하에서는 쿠키에 들어있는 토큰을 직접 넣어줘야함(브라우저 측에 저장된 쿠키에 접근할 수 없기 때문)
      ...(token && {
        headers: {
          token: token || "",
        },
      }),
    }
  );

  const { ok, error, resume } = await response.json();
  if (!ok) {
    redirect("/resume/auth");
  }

  return resume;
});
