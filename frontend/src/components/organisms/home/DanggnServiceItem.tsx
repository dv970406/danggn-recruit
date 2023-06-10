import Image from "next/image";
import React from "react";

interface IDanggnServiceItem {
  id: string;
  label: string;
  isFocusing: boolean;
}

const get3dIcon = (isFocusing: boolean) => {
  return isFocusing ? "gradient" : "clay";
};
const DanggnServiceItem = ({
  id,
  label,
  isFocusing = false,
}: IDanggnServiceItem) => {
  return (
    <li key={label} className={`service-item row-box gap-2 items-center`}>
      <Image
        width={80}
        height={80}
        src={`/3d-icons/${id}-${get3dIcon(isFocusing)}.png`}
        alt={id || ""}
        priority
      />
      <p
        className={`text-3xl lg:text-5xl break-words ${
          isFocusing && "text-white font-bold"
        }`}
      >
        {label}
      </p>
    </li>
  );
};

// 메모이징으로 스크롤을 내려도 ServiceItem들이 전부 리렌더링 되는 것을 막고, Prop에 변화가 생긴 ServiceItem들만 리렌더링됨
export default React.memo(DanggnServiceItem);