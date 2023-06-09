"use client";
import React from "react";
import { IRecruitPost } from "@/src/type/recruit-post.interface";
import { IPart } from "@/src/type/part.interface";
import SelectPart from "../../organisms/recruit/SelectPart";
import SelectCareerType from "../../organisms/recruit/SelectCareerType";
import SearchKeyword from "../../organisms/recruit/SearchKeyword";
import InfiniteScrolling from "@/src/hooks/shared/InfiniteScrolling";
import RecruitPostItem from "../../organisms/recruit/RecruitPostItem";
import { useRecruitPosts } from "@/src/hooks/recruit/RecruitPosts";
import NoData from "../../organisms/shared/NoData";
import Loader from "../../atomics/Loader";
import ListWrapper from "../../molecules/boxes/ListWrapper";

interface IRecruitPosts {
  initRecruitPostsData: IRecruitPost[];
  partsData: IPart[];
}

// /recruit
// 채용 공고의 리스트를 띄워줄 Template with Infinite Scroll
const RecruitPosts = ({ initRecruitPostsData, partsData }: IRecruitPosts) => {
  const {
    fetchNextPage,
    handleFilteringRecruitPosts,
    hasNextPage,
    recruitPostsData,
    getRecruitPostsLoading,
    getRecruitPostsFetching,
    filteringRecruitPosts,
  } = useRecruitPosts(initRecruitPostsData);

  return (
    <section
      className="w-full gap-4 layout column-box"
      id="if-click-ball-will-be-move-to-here"
    >
      <div className="column-box sm:flex-row">
        <div className="w-full gap-4 row-box">
          <SelectPart
            selectedPartName={filteringRecruitPosts.partName}
            parts={partsData}
            handleFilteringRecruitPosts={handleFilteringRecruitPosts}
          />

          <SelectCareerType
            handleFilteringRecruitPosts={handleFilteringRecruitPosts}
            selectedCareerType={filteringRecruitPosts.careerType}
          />
        </div>

        <SearchKeyword
          handleFilteringRecruitPosts={handleFilteringRecruitPosts}
        />
      </div>

      <InfiniteScrolling
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        <ListWrapper>
          {recruitPostsData?.map((recruitPost) => (
            <RecruitPostItem key={recruitPost.id} {...recruitPost} />
          ))}
          {getRecruitPostsLoading || getRecruitPostsFetching ? (
            <Loader />
          ) : (
            recruitPostsData?.length === 0 && <NoData dataType="채용공고" />
          )}
        </ListWrapper>
      </InfiniteScrolling>
    </section>
  );
};

export default RecruitPosts;
