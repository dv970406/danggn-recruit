"use client";
import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const DanggnBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const handleVideoEnded: ReactEventHandler<HTMLVideoElement> = () => {
    setIsVideoEnd(true);
  };

  // opacity:0이 duration이 1초가 걸려있는데 duration이 0.9초쯤 지났을때 비디오를 자연스럽게 삭제함
  useEffect(() => {
    if (isVideoEnd) {
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.remove();
        videoRef.current.classList.add("removed");
      }, 950);
    }
  }, [isVideoEnd]);

  return (
    <section
      className={`${
        isVideoEnd ? "bg-danggn-dark-orange" : "bg-danggn-light-orange"
      } transition-colors duration-1000 h-screen`}
    >
      <video
        ref={videoRef}
        src="/danggn/danggn-banner-video.mp4"
        autoPlay
        muted
        typeof="video/mp4"
        className={`block mx-auto ${
          isVideoEnd && "opacity-0"
        } transition-opacity duration-1000 h-full w-full`}
        onEnded={handleVideoEnded}
      />

      <Carousel
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
        <div className={`relative h-screen`}>
          <Image
            className={`object-contain `}
            src="/danggn/danggne1.jpeg"
            alt="danggne1"
            fill
            priority
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne2.jpeg"
            alt="danggne2"
            fill
            sizes="600px"
            priority
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne3.jpeg"
            alt="danggne3"
            fill
            sizes="600px"
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne4.jpeg"
            alt="danggne4"
            fill
            sizes="600px"
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne5.jpeg"
            alt="danggne5"
            fill
            sizes="600px"
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne6.jpeg"
            alt="danggne6"
            fill
            sizes="600px"
          />
        </div>
        <div className={`relative h-screen`}>
          <Image
            className="object-contain "
            src="/danggn/danggne7.jpeg"
            alt="danggne7"
            fill
            sizes="600px"
          />
        </div>
      </Carousel>
    </section>
  );
};

export default DanggnBanner;
