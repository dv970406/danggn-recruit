"use client";
import { useScrollVideo } from "@/src/hooks/home/ScrollVideo";
import React from "react";

// HomePage의 스크롤을 내릴때마다 채용 장려 영상이 재생되는 Template
const ScrollVideo = () => {
  const {
    sectionHeight,
    videoRef,
    fixedWrapperVideoRef,
    scrollVideoSectionRef,
    isCenterFix,
  } = useScrollVideo();

  return (
    <section
      // 모바일에서는 스크롤 애니메이션 재생이 안됨. 따라서 작은화면에서는 꺼놨음
      className={`my-[800px] hidden md:block`}
      style={{ height: sectionHeight }}
      ref={scrollVideoSectionRef}
    >
      <div
        ref={fixedWrapperVideoRef}
        // 동적인 값을 써야하는 경우 Tailwind사용이 제한됨
        style={{
          ...(isCenterFix !== "scrolling"
            ? {
                position: "relative",
                transform:
                  isCenterFix === "bottom"
                    ? `translateY(${
                        scrollVideoSectionRef.current?.offsetHeight! -
                        fixedWrapperVideoRef.current?.offsetHeight!
                      }px)`
                    : "initial",
              }
            : {
                position: "fixed",
                top: "50%",
                transform: "translateY(-50%)",
              }),
        }}
      >
        <video
          ref={videoRef}
          src="/danggn/danggn-scroll-video.mp4"
          loop
          muted
          typeof="video/mp4"
          className="block mx-auto"
        />
      </div>
    </section>
  );
};

export default ScrollVideo;
