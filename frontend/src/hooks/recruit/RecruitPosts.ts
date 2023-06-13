import { ChangeEventHandler, useEffect, useTransition } from "react";
import { useRecoilState } from "recoil";
import { filteringRecruitPostsState } from "../../utils/recoil/recruit";
import { IRecruitPost } from "@/src/type/recruit-post.interface";
import { useGetRecruitPosts } from "@/src/clients/mutations/recruit-post";

// Infinite Scrolling를 결합한 recruitPosts GET 로직
export const useRecruitPosts = (initRecruitPostsData: IRecruitPost[]) => {
  const [filteringRecruitPosts, setFilteringRecruitPosts] = useRecoilState(
    filteringRecruitPostsState
  );

  const [isPending, startTransition] = useTransition();
  const handleFilteringRecruitPosts: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (event) => {
    if (isPending) return;
    const { value, name } = event.currentTarget;

    startTransition(() => {
      if (isPending) return;
      setFilteringRecruitPosts((prev) => ({ ...prev, [name]: value }));
    });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: getRecruitPostsLoading,
  } = useGetRecruitPosts(filteringRecruitPosts);

  // flatMap이 진짜 중요! 다차원 배열의 depth를 -1함
  const recruitPostsData =
    data?.pages.flatMap((item) => item.recruitPosts) || initRecruitPostsData;

  console.log("recruitPostsData : ", recruitPostsData);
  return {
    recruitPostsData,
    fetchNextPage,
    hasNextPage,
    getRecruitPostsLoading,
    handleFilteringRecruitPosts,
    filteringRecruitPosts,
  };
};
