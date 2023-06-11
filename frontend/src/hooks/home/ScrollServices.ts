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

    // Scroll 구역(Template)의 시작점과 끝부분의 높이를 구해서 스크롤 이벤트에 활용할 요소 배열의 길이만큼 나눈다.
    const division =
      (serviceListEndYPosition - serviceListStartYPosition) /
      serviceItems.length;

    // 스크롤을 내릴때마다 진행시킬 이벤트
    const scrollEvent = () => {
      // 이전에 포커스되어 있던 요소를 블러 처리하기 위함
      setFocusedItem("");

      // 화면이 스크롤 영역 Template 안에 있는가 체크
      if (
        window.scrollY > serviceListStartYPosition &&
        window.scrollY < serviceListEndYPosition
      ) {
        // 스크롤 감지 영역 안에 들어온 요소를 체크
        const targetIndex = Math.floor(
          (window.scrollY - serviceListStartYPosition) / division
        );

        // 그 요소의 텍스트(label)를 식별자로 사용할 것임(겹치는 값 없어서 괜찮음)
        const targetContent = serviceItems[targetIndex].textContent || "";

        // 그 요소를 포커스하고 로직을 처리하여 이미지를 바꾸고 텍스트를 하얀색으로 만들것임.
        setFocusedItem(targetContent);
      }
    };
    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  return { danggnServicesSectionRef, focusedItem };
};
