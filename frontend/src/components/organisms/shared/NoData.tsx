import Image from "next/image";
import React from "react";

interface INoData {
  dataType?: string;
}
const NoData = ({ dataType = "데이터" }: INoData) => {
  return (
    <div className="gap-4 mt-16 column-box flex-center">
      <Image
        src={"/danggn/nodata-logo.png"}
        width={50}
        height={50}
        alt="nodata"
        className="animate-bounce"
      />
      <h3 className="text-sub text-danggn-darkgray">
        존재하는 <span className="text-danggn-orange">{dataType}</span>가
        없습니다!
      </h3>
    </div>
  );
};

export default NoData;
