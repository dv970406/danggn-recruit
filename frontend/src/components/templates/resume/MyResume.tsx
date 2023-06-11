import Link from "next/link";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { IResume } from "@/src/type/resume.interface";
import { getCreatedDateFormat } from "@/src/utils/func/time";
import ApplicantInfoItem from "../../organisms/shared/ApplicantInfoItem";
import Metadata from "../../organisms/shared/Metadata";
import Title from "../../atomics/Title";

// /resume/my/:resumeId
// 내가 지원한 채용공고의 detail을 확인할 수 있음
interface IMyResume {
  resumeData: IResume;
}
const MyResume = ({ resumeData }: IMyResume) => {
  const { recruitPost, applicant, pdfLink, createdAt } = resumeData;

  return (
    <section className="z-50 w-full gap-12 mt-8 flex-center column-box">
      <div className="gap-4 column-box place-self-end">
        <Link
          href={`/recruit/${recruitPost.id}`}
          className={`place-self-end text-orange-transition`}
        >
          <Title text={recruitPost.title} isPositionEnd />
        </Link>
        <Metadata
          isPositionEnd
          careerType={recruitPost.careerType}
          partName={recruitPost.part.partName}
          workType={recruitPost.workType}
        />
      </div>
      <ul className="w-full gap-8 column-box">
        <ApplicantInfoItem label="이름" value={applicant.name} />
        <ApplicantInfoItem label="전화번호" value={applicant.phoneNumber} />
        <ApplicantInfoItem label="이메일" value={applicant.email} />
        <ApplicantInfoItem
          label="이력서 및 경력기술서"
          elementValue={
            <a
              href={pdfLink}
              download={`${applicant.name}_이력서.pdf`}
              className={`items-center gap-2 row-box text-orange-transition`}
            >
              <FaFilePdf />
              첨부파일
            </a>
          }
        />

        <ApplicantInfoItem
          label="제출일"
          value={getCreatedDateFormat(createdAt)}
        />
      </ul>
    </section>
  );
};

export default MyResume;
