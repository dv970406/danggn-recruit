import { ClipLoader } from "react-spinners";
import React from "react";
import { COLORS } from "@/src/utils/values/color";

interface ILoader {
  color?: string;
  isButton?: boolean;
}
const Loader = ({ color, isButton = false }: ILoader) => {
  return (
    <div className={`flex-center  ${!isButton && "mt-[40px] w-screen"}`}>
      <ClipLoader color={color || COLORS["danggn-orange"]} />
    </div>
  );
};

export default Loader;
