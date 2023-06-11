import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface IServiceButton {
  selectedServiceId: string;
  serviceId: string;
  handleSelectedServiceId: () => void;
}

// molecules성이 짙긴한데 service에서만 쓰일 것같아서 organisms에 뒀음
// Service Page의 화면이 작아졌을 때 나타날 버튼 아이콘 요소(반응형)
const ServiceButton = ({
  serviceId,
  selectedServiceId,
  handleSelectedServiceId,
}: IServiceButton) => {
  return (
    <button
      className={`p-2 rounded-md shadow-md ${
        serviceId === selectedServiceId && `bg-danggn-lightgray ring-transition`
      }`}
      onClick={handleSelectedServiceId}
    >
      <Image
        src={`/service/${serviceId}-symbol.png`}
        width={50}
        height={50}
        alt={`${serviceId}-symbol`}
        priority
        className="w-auto h-auto"
      />
    </button>
  );
};

export default ServiceButton;
