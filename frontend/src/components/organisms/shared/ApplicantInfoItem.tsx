import React from "react";

interface IApplicantInfoItem {
  label: string;
  value?: string;
  elementValue?: React.ReactNode;
}

// 지원이 끝난 Resume의 정보를 띄워줄 아이템
const ApplicantInfoItem = ({
  label,
  value,
  elementValue,
}: IApplicantInfoItem) => {
  return (
    <li className="border-b-[1px] py-4 between-center border-b-danggn-lightgray">
      <p className="text-sub text-danggn-darkgray">{label}</p>
      {value && <p className="text-main">{value}</p>}
      {elementValue && elementValue}
    </li>
  );
};

export default ApplicantInfoItem;
