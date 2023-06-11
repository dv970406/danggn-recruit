"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IApplyTab {
  recruitPostId: string;
}

// 채용공고 Detail 화면의 페이지 분기처리에 사용될 탭
const ApplyTab = ({ recruitPostId }: IApplyTab) => {
  const pathname = usePathname();
  const isApplyPage = pathname.includes("/apply");
  return (
    <ul className="space-x-4 border-b-[1px] row-box border-b-danggn-lightgray">
      <li>
        <Link href={`/recruit/${recruitPostId}`}>
          <p
            className={`p-2  text-main transition-colors duration-300 ${
              isApplyPage ? "text-danggn-darkgray" : "text-danggn-orange"
            }`}
          >
            영입정보
          </p>
        </Link>
      </li>
      <li>
        <Link href={`/recruit/${recruitPostId}/apply`}>
          <p
            className={`p-2 text-main transition-colors duration-300 ${
              isApplyPage ? "text-danggn-orange" : "text-danggn-darkgray"
            }`}
          >
            지원하기
          </p>
        </Link>
      </li>
    </ul>
  );
};

export default ApplyTab;
