import { QueryClient } from "@tanstack/react-query";

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

// react-query에서 쓰일 Query의 Key값들을 객체로 관리
export const QueryKeys = {
  PART: "PART",
  RESUME: "RESUME",
  APPLICANT: "APPLICANT",
  RECRUIT_POST: "RECRUIT_POST",
};
