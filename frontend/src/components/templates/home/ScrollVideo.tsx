"use client";
import React, { useEffect, useRef, useState } from "react";

const ScrollVideo = () => {
  const scrollVideoSectionRef = useRef<HTMLDivElement>(null); // section
  const fixedWrapperVideoRef = useRef<HTMLDivElement>(null); // fixed-wrapper
  const videoRef = useRef<HTMLVideoElement>(null); // video

  const [isCenterFix, setIsCenterFix] = useState(""); // top, scrolling, bottom
  const [sectionHeight, setSectionHeight] = useState(0);

  const videoPlayBack = 600;

  useEffect(() => {
    const fixWrapperToCenter = () => {
      // 정상적으로 스크롤되고 있을 때
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

    return () => {
      window.removeEventListener("scroll", fixWrapperToCenter);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current)
      // 영상의 길이 * 재생속도 = 높이
      setSectionHeight(
        +(videoRef.current?.duration! * videoPlayBack).toFixed(0)
      );
  }, [videoRef]);

  return (
    <section
      className={`my-[800px]`}
      style={{ height: sectionHeight }}
      ref={scrollVideoSectionRef}
    >
      <div
        ref={fixedWrapperVideoRef}
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
          src="/danggn.mp4"
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
