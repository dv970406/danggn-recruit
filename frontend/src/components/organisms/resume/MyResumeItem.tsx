import { IResume } from "@/src/type/resume.interface";
import Link from "next/link";
import React from "react";
import Metadata from "../shared/Metadata";

interface IMyResumeItem {
  myResume: IResume;
}

// RecruitPostItem과 똑같은 용도이나 organisms 특성상 페이지별로 분리해야 하기에 따로 만듦.
// <Link>부터 자식까지 새로 묶어서 RecruitPostItem & MyResumeItem에서 재사용해도 되긴할듯
const MyResumeItem = ({
  myResume: { id: resumeId, recruitPost },
}: IMyResumeItem) => {
  return (
    <li>
      <Link
        key={resumeId}
        href={`/resume/my/${resumeId}`}
        className={`px-1 py-6 border-b-[1px] column-box text-danggn-transition border-b-transition group gap-2 md:flex-row md:between-center group`}
      >
        <h2 className="overflow-hidden text-subtitle text-ellipsis text-darkgray-transition group-hover:text-danggn-darkgray">
          {recruitPost.title}
        </h2>

        <Metadata
          careerType={recruitPost.careerType}
          workType={recruitPost.workType}
          partName={recruitPost.part?.partName}
        />
      </Link>
    </li>
  );
};

export default MyResumeItem;
