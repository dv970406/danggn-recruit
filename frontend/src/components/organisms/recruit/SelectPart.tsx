import { IPart } from "@/src/type/part.interface";
import React, { ChangeEventHandler } from "react";

interface ISelectPart {
  selectedPartName: string;
  handleFilteringRecruitPosts: ChangeEventHandler<HTMLSelectElement>;
  parts: IPart[];
}

// 원하는 지원 파트의 채용공고를 보기 위한 드랍다운
const SelectPart = ({
  handleFilteringRecruitPosts,
  selectedPartName,
  parts,
}: ISelectPart) => {
  return (
    <select
      className="w-full p-2 rounded-lg outline-none backdrop-blur-md ring-transition"
      name="partName"
      value={selectedPartName}
      onChange={handleFilteringRecruitPosts}
    >
      {parts?.map((part) => (
        <option key={part.id} value={part.partName}>
          {part.partName}
        </option>
      ))}
    </select>
  );
};

export default SelectPart;
