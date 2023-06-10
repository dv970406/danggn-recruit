import { IRecruitPost } from "@/src/type/recruit-post.interface";
import React from "react";
import { getRecruitPost } from "./fetcher";
import ApplyTab from "@/src/components/organisms/recruit/ApplyTab";
import NavigationButton from "@/src/components/molecules/buttons/NavigationButton";
import Title from "@/src/components/atomics/Title";
import Metadata from "@/src/components/organisms/shared/Metadata";

interface IRecruitPostLayout {
  children: React.ReactNode;
  params: {
    recruitPostId: string;
  };
}

// /recruit/apply/success page는 아래 layout사용하면 안돼서 예약파일로 사용하진 않았음
const RecruitPostLayout = async ({ children, params }: IRecruitPostLayout) => {
  const {
    title,
    part,
    careerType,
    workType,
    id: recruitPostId,
  }: IRecruitPost = await getRecruitPost(params.recruitPostId);

  return (
    <article className="gap-10 column-box layout">
      <div className="gap-4 column-box">
        <div className="my-8">
          <NavigationButton path="/recruit" />
        </div>
        <Title text={title} />

        <Metadata
          partName={part?.partName}
          careerType={careerType}
          workType={workType}
        />
      </div>
      <nav>
        <ApplyTab recruitPostId={recruitPostId} />
      </nav>

      {children}
    </article>
  );
};

export default RecruitPostLayout;
