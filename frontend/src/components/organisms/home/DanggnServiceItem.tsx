import Image from "next/image";
import React from "react";
import { ImageLoader } from "next/image";
interface IDanggnServiceItem {
  id: string;
  label: string;
  isFocusing: boolean;
}

const get3DIcon = (isFocusing: boolean) => {
  return isFocusing ? "gradient" : "clay";
};

// HomePage의 스크롤 인터랙션에 사용될 아이템
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
        src={`/3d-icons/${id}-${get3DIcon(isFocusing)}.png`}
        alt={id || ""}
        className="w-auto h-auto"
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
