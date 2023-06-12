import { Metadata, NextPage } from "next";
import React, { Suspense } from "react";
import MyResumes from "@/src/components/templates/resume/MyResumes";
import Loader from "@/src/components/atomics/Loader";

export const metadata = {
  title: "지원내역 | 당근마켓 by 성준",
};

interface IMyResumePage {}

// /resume/my Page 렌더링 방식 : CSR
// 인증한 유저에 따라 다른 데이터를 보여줘야함. - 미리 만들어두는 것 불가(=SSG불가)
// 유저의 정보가 필요하다보니 generateStatic으로 정적으로 만들어두는 것도 사실상 불가
// SEO가 중요한 페이지도 아님 => SSR 배제
// 유저가 인증하기 버튼을 눌러 이동하는 페이지이다보니 CSR이 적당할듯
const MyResumePage: NextPage<IMyResumePage> = ({}) => {
  return <MyResumes />;
};

export default MyResumePage;
