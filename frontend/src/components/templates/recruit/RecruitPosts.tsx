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
    filteringRecruitPost,
  } = useRecruitPosts(initRecruitPostsData);

  return (
    <section className="w-full layout" id="if-click-ball-will-be-move-to-here">
      <div className="gap-4 row-box">
        <SelectPart
          selectedPartName={filteringRecruitPost.partName}
          parts={partsData}
          handleFilteringRecruitPosts={handleFilteringRecruitPosts}
        />

        <SelectCareerType
          handleFilteringRecruitPosts={handleFilteringRecruitPosts}
          selectedCareerType={filteringRecruitPost.careerType}
        />

        <SearchKeyword
          handleFilteringRecruitPosts={handleFilteringRecruitPosts}
        />
      </div>

      <InfiniteScrolling
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        <ul className="w-full gap-4 column-box">
          {recruitPostsData?.map((recruitPost) => (
            <RecruitPostItem key={recruitPost.id} {...recruitPost} />
          ))}
        </ul>
      </InfiniteScrolling>
    </section>
  );
};

export default RecruitPosts;
