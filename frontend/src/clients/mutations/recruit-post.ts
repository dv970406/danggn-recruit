import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../client";
import {
  IGetRecruitPostsInput,
  IGetRecruitPosts,
} from "@/src/type/recruit-post.interface";
import { getRecruitPosts } from "../fetchers/recruit-post";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useGetRecruitPosts = (filterer?: IGetRecruitPostsInput) => {
  const result = useInfiniteQuery<IGetRecruitPosts>(
    [QueryKeys.RECRUIT_POST],
    ({ pageParam = 0 }) => getRecruitPosts({ ...filterer!, pageParam }),
    {
      // return하는 값으로 pageParam의 값을 정해주는 기능(pageParam이 1페이지씩 늘어나야하니까 전체페이지에 +1을 한 것)
      // 만약 return하는 값이 값이 아닌 경우에는 hasNextPage가 false가 됨
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage : ", lastPage);
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

  // // 서버측에서 렌더링된 채용공고 데이터들을 클라이언트측에서 fetching한 데이터와 동기화시키기 위함
  const router = useRouter();
  useEffect(() => {
    if (!result.isInitialLoading) return;
    router.refresh();
    console.log("refreshing Data : ", result.data);
  }, [result.isInitialLoading]);

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
