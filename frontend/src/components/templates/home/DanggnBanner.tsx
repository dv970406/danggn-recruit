"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDanggnBanner } from "@/src/hooks/home/DanggnBanner";
import DanggneItem from "../../organisms/home/DanggneItem";

const DANGGNE_IMAGES = [
  "danggne1",
  "danggne2",
  "danggne3",
  "danggne4",
  "danggne5",
  "danggne6",
  "danggne7",
];
// HomePage에서 Danggn 영상 재생 후 3D 이미지들을 carousel에 싣는 Template
const DanggnBanner = () => {
  const { isVideoEnd, videoRef, handleVideoEnded } = useDanggnBanner();

  return (
    <section
      className={`${
        isVideoEnd ? "bg-danggn-dark-orange" : "bg-danggn-light-orange"
      } transition-colors duration-1000 h-screen`}
    >
      <video
        ref={videoRef}
        src="/danggn/danggn-banner-video.mp4"
        // 모바일에서 자동재생하려면 당연히 autoplay가 필요하고 추가로 muted, playsInline켜줘야함
        autoPlay
        // 음소거
        muted
        // playsInline은 iOS에서 영상이 재생될때 전체화면을 막음
        playsInline
        typeof="video/mp4"
        className={`block mx-auto ${
          isVideoEnd && "opacity-0"
        } transition-opacity duration-1000 h-full w-full`}
        onEnded={handleVideoEnded}
      />

      <Carousel
        swipeable={false}
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        transitionTime={1000}
        interval={4000}
        showArrows={false}
        stopOnHover={false}
        className={`h-full ${
          isVideoEnd
            ? `opacity-100 transition-opacity delay-[950ms] duration-500`
            : "opacity-0"
        }  `}
      >
        {DANGGNE_IMAGES.map((danggne) => (
          <DanggneItem key={danggne} danggne={danggne} />
        ))}
      </Carousel>
    </section>
  );
};

export default DanggnBanner;
