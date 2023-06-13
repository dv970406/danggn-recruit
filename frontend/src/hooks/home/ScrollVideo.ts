import { useEffect, useRef, useState } from "react";

export const useScrollVideo = () => {
  const scrollVideoSectionRef = useRef<HTMLDivElement>(null); // section
  const fixedWrapperVideoRef = useRef<HTMLDivElement>(null); // fixed-wrapper
  const videoRef = useRef<HTMLVideoElement>(null); // video

  const [isCenterFix, setIsCenterFix] = useState(""); // top, scrolling, bottom
  const [sectionHeight, setSectionHeight] = useState(0);

  const videoPlayBack = 600;

  useEffect(() => {
    const fixWrapperToCenter = () => {
      // Video Template 영역안에서 정상적으로 스크롤되고 있을 때 'scrolling' 정보를 저장함
      if (
        window.scrollY >
        scrollVideoSectionRef.current?.offsetTop! -
          (document.documentElement.clientHeight -
            fixedWrapperVideoRef.current?.offsetHeight!) /
            2
      ) {
        setIsCenterFix("scrolling");

        if (videoRef.current) {
          videoRef.current.currentTime =
            (window.scrollY - scrollVideoSectionRef.current?.offsetTop!) /
            videoPlayBack;
        }
      } // 위로 벗어났을 때
      else {
        setIsCenterFix("top");
      }

      // 아래로 벗어났을 때
      if (
        window.scrollY >
        scrollVideoSectionRef.current?.offsetTop! +
          scrollVideoSectionRef.current?.offsetHeight! -
          (fixedWrapperVideoRef.current?.offsetHeight! +
            (document.documentElement.clientHeight -
              fixedWrapperVideoRef.current?.offsetHeight!) /
              2)
      ) {
        setIsCenterFix("bottom");
      }
    };
    window.addEventListener("scroll", fixWrapperToCenter);
    window.addEventListener("touchmove", fixWrapperToCenter);

    return () => {
      window.removeEventListener("scroll", fixWrapperToCenter);
      window.addEventListener("touchmove", fixWrapperToCenter);
    };
  }, []);

  useEffect(() => {
    // 영상의 길이 * 재생속도 = 높이
    const getSectionHeight = () =>
      setSectionHeight(
        +(videoRef.current?.duration! * videoPlayBack).toFixed(0)
      );

    if (videoRef.current?.duration) {
      // 최초 mount되었을 때 바로 적용하기 위함
      getSectionHeight();
    } else {
      // video 데이터 로드가 완전히 끝났을 때 duration값을 제공해줌
      // 다른 페이지 갔다가 다시 돌아왔을 때 적용하기 위함
      videoRef.current?.addEventListener("loadedmetadata", getSectionHeight);

      return () => {
        videoRef.current?.removeEventListener(
          "loadedmetadata",
          getSectionHeight
        );
      };
    }
  }, [videoRef]);

  return {
    isCenterFix,
    sectionHeight,
    scrollVideoSectionRef,
    fixedWrapperVideoRef,
    videoRef,
  };
};
