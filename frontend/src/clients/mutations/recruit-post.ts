import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { QueryKeys } from "../client";
import {
  IRecruitPost,
  IGetRecruitPostsInput,
} from "@/src/type/recruit-post.interface";
import { getRecruitPosts } from "../fetchers/recruit-post";
import { useEffect } from "react";

export const useGetRecruitPosts = (filterer?: IGetRecruitPostsInput) => {
  const result = useInfiniteQuery<{
    ok: boolean;
    recruitPosts: IRecruitPost[];
    error?: string;
    isLastPage?: boolean;
  }>(
    [QueryKeys.RECRUIT_POST],
    ({ pageParam = 1 }) => getRecruitPosts({ ...filterer!, pageParam }),
    {
      // return하는 값으로 pageParam의 값을 정해주는 기능(pageParam이 1페이지씩 늘어나야하니까 전체페이지에 +1을 한 것)
      // 만약 return하는 값이 값이 아닌 경우에는 hasNextPage가 false가 됨
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.isLastPage) return;
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      // suspense: true,
    }
  );

  useEffect(() => {
    result.refetch();
  }, [filterer]);

  return result;
};

// export const useGetRecruitPost = (recruitPostId?: string) => {
//   const result = useQuery<IRecruitPost>(
//     [QueryKeys.RESUME, recruitPostId],
//     () => getRecruitPost(recruitPostId),
//     {
//       enabled: !!recruitPostId,
//     }
//   );

//   return result;
// };
