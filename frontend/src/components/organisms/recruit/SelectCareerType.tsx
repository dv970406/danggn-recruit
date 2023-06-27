import React, { ChangeEventHandler } from "react";
import Select from "../../molecules/inputs/Select";

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
    <Select
      name="careerType"
      value={selectedCareerType}
      onChange={handleFilteringRecruitPosts}
      options={
        <>
          <option value={"경력"}>경력</option>
          <option value={"무관"}>무관</option>
          <option value={"신입"}>신입</option>
        </>
      }
    />
  );
};

export default SelectCareerType;
