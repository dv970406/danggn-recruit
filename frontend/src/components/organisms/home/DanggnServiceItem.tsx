import Image from "next/image";
import React from "react";
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
      {/* 원래라면 동적으로 로드되어야할 이미지만 최대한 정적으로 로드하기 위해 Image를 모두 걸어놓은 후 visible-invisible로 컨트롤. display:none은 이미지를 로드를 안하므로 사용하지 않음*/}
      {/* display:hidden은 이미지를 로드하지 않아서 visibility:hidden과 zindex를 사용 */}
      <div className="relative ">
        <Image
          width={80}
          height={80}
          src={`/3d-icons/${id}-gradient.png`}
          alt={id || ""}
          className={`${
            isFocusing ? "visible z-10" : "invisible"
          } absolute top-0 left-0 w-auto h-auto`}
        />
        <Image
          width={80}
          height={80}
          src={`/3d-icons/${id}-clay.png`}
          alt={id || ""}
          className={`${
            isFocusing ? "invisible" : "visible z-10"
          } absolute top-0 left-0 w-auto h-auto`}
        />
      </div>
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
