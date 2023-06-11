import React from "react";
import { CircleDivider } from "../../atomics/Divider";

interface IMetadata {
  partName: string;
  careerType: string;
  workType: string;
  isPositionEnd?: boolean;
}

// 채용공고, 지원한 공고의 파트, 경력여부, 업무타입
const Metadata = ({
  partName,
  careerType,
  workType,
  isPositionEnd = false,
}: IMetadata) => {
  return (
    <ul className={`row-box ${isPositionEnd && "place-self-end"}`}>
      <li className="text-sub text-danggn-darkgray whitespace-nowrap">
        {partName}
      </li>
      <CircleDivider />
      <li className="text-sub text-danggn-darkgray whitespace-nowrap">
        {careerType}
      </li>
      <CircleDivider />
      <li className="text-sub text-danggn-darkgray whitespace-nowrap">
        {workType}
      </li>
    </ul>
  );
};

export default Metadata;
