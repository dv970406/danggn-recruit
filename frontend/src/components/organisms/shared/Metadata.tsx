import React from "react";
import { VerticalDivider } from "../../atomics/Divider";

interface IMetadata {
  partName: string;
  careerType: string;
  workType: string;
  isPositionEnd?: boolean;
}
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
      <VerticalDivider />
      <li className="text-sub text-danggn-darkgray whitespace-nowrap">
        {careerType}
      </li>
      <VerticalDivider />
      <li className="text-sub text-danggn-darkgray whitespace-nowrap">
        {workType}
      </li>
    </ul>
  );
};

export default Metadata;
