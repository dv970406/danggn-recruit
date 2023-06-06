import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryKeys = {
  PART: "PART",
  RESUME: "RESUME",
  APPLICANT: "APPLICANT",
  RECRUIT_POST: "RECRUIT_POST",
};
