import React from "react";
import { COLORS } from "@/src/utils/values/color";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

interface ILoader {
  color?: string;
  isButton?: boolean;
}

// 버튼 눌러서 발생하는 로딩의 경우에는 다이나믹 처리 되면 안됨
// 따라서 개별 Loader를 하나 더만듦
const Loader = ({ color, isButton = false }: ILoader) => {
  return (
    <div className={`flex-center  ${!isButton && "mt-[40px] w-screen"}`}>
      <ClipLoader color={color || COLORS["danggn-orange"]} />
    </div>
  );
};

export default Loader;
