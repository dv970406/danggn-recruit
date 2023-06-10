"use client";
import { useScrollVideo } from "@/src/hooks/home/ScrollVideo";
import React from "react";

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
