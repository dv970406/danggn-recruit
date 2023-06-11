import { IRecruitPost } from "@/src/type/recruit-post.interface";
import Link from "next/link";
import React from "react";
import Metadata from "../shared/Metadata";

interface IRecruitPostItem extends IRecruitPost {}

// 채용공고 리스트의 각 row 아이템
const RecruitPostItem = ({
  id: recruitPostId,
  title,
  careerType,
  part,
  workType,
}: IRecruitPostItem) => {
  return (
    <li>
      <Link
        key={recruitPostId}
        href={`/recruit/${recruitPostId}`}
        className={`px-1 py-6 border-b-[1px] column-box text-danggn-transition border-b-transition group gap-2 md:flex-row md:between-center group`}
      >
        <h2 className="overflow-hidden text-subtitle text-ellipsis text-darkgray-transition group-hover:text-danggn-darkgray">
          {title}
        </h2>

        <Metadata
          careerType={careerType}
          workType={workType}
          partName={part?.partName}
        />
      </Link>
    </li>
  );
};

export default RecruitPostItem;
