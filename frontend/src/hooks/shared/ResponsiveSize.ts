import { useEffect, useState } from "react";

// 화면 크기에 따라 자바스크립트로 처리해야하는 로직이 존재하므로 화면 크기에 따른 반응형 사이즈를 구해주는 로직
export const useResponsiveSize = () => {
  const [responsiveSize, setResponsiveSize] = useState("");

  // 일단 테일윈드 기준에 맞췄음
  const handleResize = () => {
    // Desktop
    if (innerWidth > 1023) {
      setResponsiveSize("lg");
    }
    // Tablet
    else if (innerWidth > 767) {
      setResponsiveSize("md");
    } else if (innerHeight > 639) {
      setResponsiveSize("sm");
    }
    // 639이전까지는 Mobile
    else {
      setResponsiveSize("mobile");
    }
  };
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { responsiveSize };
};
