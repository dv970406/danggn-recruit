import ApplySuccess from "@/src/components/templates/recruit/ApplySuccess";
import Confetti from "@/src/components/templates/resume/Confetti";
import React from "react";

// /recruit/:recruitPostId/apply/success Page 렌더링 방식 : CSR
// URL을 통한 접근을 막기 위함 + params로 resumeId를 받지 않으므로 서버측에서 데이터를 가져올 수 있는 수단이 없음
// 그리고 지원 성공 페이지는 SEO가 중요하지도 않음
// CreateResume이 성공하면 서버에서 받은 resume data를 recoil 전역상태에 담아 useRouter로 이 페이지로 보냄
// ApplySuccess Template에서 전역상태에 resume data가 없으면 /apply 페이지로 돌려보낼 것임(URL접근 막기)
const ApplySuccessPage = () => {
  return (
    <article className="h-full layout flex-center">
      <Confetti />
      <ApplySuccess />
    </article>
  );
};

export default ApplySuccessPage;
