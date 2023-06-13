import React from "react";
import { COLORS } from "@/src/utils/values/color";
import dynamic from "next/dynamic";

// SSR처리중 Suspense로 Loader를 띄워줄 때 페이지 소스코드에 Spinner가 남으면 페이지의 의미있는 정보가 남는 것이 아님
// 따라서 SEO 효율을 해칠 수 있음 - 서버측에서 렌더링 시키지 않기 위해 dynamic import를 사용함
// 이제 Spinner는 반드시 하이드레이션이 일어난 후 렌더링될 것이다.
const ClipLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.ClipLoader),
  {
    ssr: false,
  }
);
interface ILoader {
  color?: string;
  isButton?: boolean;
}

// Suspense or API요청 처리 중 보여줄 Loader
const DynamicLoader = ({ color, isButton = false }: ILoader) => {
  return (
    <div className={`flex-center  ${!isButton && "mt-[40px] w-screen"}`}>
      <ClipLoader color={color || COLORS["danggn-orange"]} />
    </div>
  );
};

export default DynamicLoader;
