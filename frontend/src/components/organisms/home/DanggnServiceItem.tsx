import Image from "next/image";
import React from "react";
interface IDanggnServiceItem {
  id: string;
  label: string;
  isFocusing: boolean;
}

// HomePage의 스크롤 인터랙션에 사용될 아이템
const DanggnServiceItem = ({
  id,
  label,
  isFocusing = false,
}: IDanggnServiceItem) => {
  return (
    <li
      key={label}
      className={`relative service-item row-box gap-2 items-center`}
    >
      {/* 첫번째 <Image/>는 동적인 이미지가 로드될 때 공백을 막기 위해 미리 preload해두기 위해 정적으로 세팅해둔 Image임 */}
      <Image
        width={80}
        height={80}
        src={`/3d-icons/${id}-gradient.png`}
        alt={id || ""}
        className={`invisible absolute top-0 left-0`}
      />
      <Image
        width={80}
        height={80}
        src={`/3d-icons/${id}-gradient.png`}
        alt={id || ""}
        className={`${isFocusing ? "block" : "hidden"}`}
      />
      <Image
        width={80}
        height={80}
        src={`/3d-icons/${id}-clay.png`}
        alt={id || ""}
        className={`${isFocusing ? "hidden" : "block"}`}
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
