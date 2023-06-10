import { useEffect, useState } from "react";

export const useResponsiveSize = () => {
  const [responsiveSize, setResponsiveSize] = useState("");

  const handleResize = () => {
    // 일단 테일윈드 기준에 맞췄음
    // Desktop
    if (innerWidth > 1023) {
      setResponsiveSize("lg");
    }
    // Tablet
    else if (innerWidth > 767) {
      setResponsiveSize("md");
    }
    // 639이전까지는 Mobile
    else {
      setResponsiveSize("sm");
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
