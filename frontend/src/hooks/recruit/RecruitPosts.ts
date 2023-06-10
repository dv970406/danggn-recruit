import { ChangeEventHandler, useTransition } from "react";
import { useRecoilState } from "recoil";
import { filteringRecruitPostState } from "../../utils/recoil/recruit";
import { IPart } from "@/src/type/part.interface";
import { IRecruitPost } from "@/src/type/recruit-post.interface";
import { useGetRecruitPosts } from "@/src/clients/mutations/recruit-post";

export const useRecruitPosts = (initRecruitPostsData: IRecruitPost[]) => {
  const [filteringRecruitPost, setFilteringRecruitPostState] = useRecoilState(
    filteringRecruitPostState
  );

  const [isPending, startTransition] = useTransition();
  const handleFilteringRecruitPosts: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (event) => {
    if (isPending) return;
    const { value, name } = event.currentTarget;

    startTransition(() => {
      if (isPending) return;
      setFilteringRecruitPostState((prev) => ({ ...prev, [name]: value }));
    });
  };

  const { data, fetchNextPage, hasNextPage } =
    useGetRecruitPosts(filteringRecruitPost);

  // flatMap이 진짜 중요! 다차원 배열의 depth를 -1함
  const recruitPostsData =
    data?.pages.flatMap((item) => item.recruitPosts) || initRecruitPostsData;
  return {
    recruitPostsData,
    fetchNextPage,
    hasNextPage,
    handleFilteringRecruitPosts,
    filteringRecruitPost,
  };
};