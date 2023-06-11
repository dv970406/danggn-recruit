import React, { ChangeEventHandler } from "react";

interface ISelectCareerType {
  selectedCareerType: string;
  handleFilteringRecruitPosts: ChangeEventHandler<HTMLSelectElement>;
}

// 경력, 무관, 신입을 고르는 드랍다운
const SelectCareerType = ({
  handleFilteringRecruitPosts,
  selectedCareerType,
}: ISelectCareerType) => {
  return (
    <select
      className="w-full p-2 rounded-lg outline-none backdrop-blur-md ring-transition"
      name="careerType"
      value={selectedCareerType}
      onChange={handleFilteringRecruitPosts}
    >
      <option value={"경력"}>경력</option>
      <option value={"무관"}>무관</option>
      <option value={"신입"}>신입</option>
    </select>
  );
};

export default SelectCareerType;
