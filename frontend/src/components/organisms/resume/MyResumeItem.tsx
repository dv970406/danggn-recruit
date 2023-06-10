import { IResume } from "@/src/type/resume.interface";
import Link from "next/link";
import React from "react";
import Metadata from "../shared/Metadata";

interface IMyResumeItem {
  myResume: IResume;
}
const MyResumeItem = ({
  myResume: { id: resumeId, recruitPost },
}: IMyResumeItem) => {
  return (
    <li>
      <Link
        key={resumeId}
        href={`/resume/my/${resumeId}`}
        className={`px-1 py-6 border-b-[1px] column-box text-darkgray-transition border-b-transition group gap-2 md:flex-row md:between-center `}
      >
        <h3 className="overflow-hidden text-xl font-semibold sm:text-3xl text-ellipsis">
          {recruitPost.title}
        </h3>

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
