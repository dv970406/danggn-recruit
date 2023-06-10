import React from "react";

interface IResumeLayout {
  children: React.ReactNode;
}
const ResumeLayout = async ({ children }: IResumeLayout) => {
  // resume 경로의 모든 페이지들은 tailwind에서 내가 커스텀해놓은 layout 템플릿을 사용할 것임
  return <article className="layout">{children}</article>;
};

export default ResumeLayout;
