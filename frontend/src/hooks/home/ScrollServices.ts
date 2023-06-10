import { useEffect, useRef, useState } from "react";

export const useScrollServices = () => {
  const danggnServicesSectionRef = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState("");

  useEffect(() => {
    // 스크롤 중간쯤부터 애니메이션이 시작되게 하기 위해 전체 문서 크기의 절반을 빼줬음
    const serviceListStartYPosition =
      danggnServicesSectionRef.current?.offsetTop! -
      document.documentElement.clientHeight / 2;
    const serviceListEndYPosition = 2000;

    const serviceItems = document.querySelectorAll(".service-item");

    const division =
      (serviceListEndYPosition - serviceListStartYPosition) /
      serviceItems.length;

    const scrollEvent = () => {
      setFocusedItem("");

      if (
        window.scrollY > serviceListStartYPosition &&
        window.scrollY < serviceListEndYPosition
      ) {
        const targetIndex = Math.floor(
          (window.scrollY - serviceListStartYPosition) / division
        );

        const targetContent = serviceItems[targetIndex].textContent || "";
        setFocusedItem(targetContent);
      }
    };
    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  return { danggnServicesSectionRef, focusedItem };
};
