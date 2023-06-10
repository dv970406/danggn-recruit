"use client";

import { successAppliedResumeState } from "@/src/utils/recoil/resume";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";
import { FaFilePdf } from "react-icons/fa";
import { redirect, useParams } from "next/navigation";
import { getCreatedDateFormat } from "@/src/utils/func/time";
import Metadata from "../../organisms/shared/Metadata";
import ListItem from "../../organisms/shared/ListItem";
import Title from "../../atomics/Title";

interface IApplySuccess {}
const ApplySuccess = ({}: IApplySuccess) => {
  const { applicant, recruitPost, pdfLink, createdAt } = useRecoilValue(
    successAppliedResumeState
  );

  const { recruitPostId } = useParams();

  // URL로 접근하면 데이터가 없어서 redirect시킬 것임
  if (!applicant || !recruitPost) {
    redirect(`/recruit/${recruitPostId}/apply`);
  }

  return (
    <section className="z-50 w-full gap-12 mt-8 flex-center column-box">
      <div className="gap-3 column-box place-self-end">
        <Title text={recruitPost.title} isPositionEnd />

        <Metadata
          isPositionEnd
          partName={recruitPost?.part?.partName}
          careerType={recruitPost.careerType}
          workType={recruitPost.workType}
        />
      </div>
      <ul className="w-full gap-8 column-box">
        <ListItem label="이름" value={applicant.name} />
        <ListItem label="전화번호" value={applicant.phoneNumber} />
        <ListItem label="이메일" value={applicant.email} />
        <ListItem
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
        <ListItem label="제출일" value={getCreatedDateFormat(createdAt)} />
      </ul>
      <div className="gap-2 flex-center column-box">
        <p className=" text-danggn-orange text-subtitle">
          지원이 성공적으로 처리되었습니다.
        </p>
        <p>내 지원현황을 통해 지원내역을 확인할 수 있습니다.</p>
      </div>
      <div className="gap-4 row-box">
        <button className={`px-4 py-2 text-white rounded-md bg-danggn-orange `}>
          <Link href={"/resume/auth"}>내 지원현황</Link>
        </button>

        <button
          className={`px-4 py-2 border-2 rounded-md border-danggn-orange text-danggn-orange`}
        >
          <Link href={"/"}>홈으로 가기</Link>
        </button>
      </div>
    </section>
  );
};

export default ApplySuccess;
