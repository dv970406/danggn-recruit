import { ReactEventHandler, useEffect, useRef, useState } from "react";

// 당근 비디오 재생 후 비디오를 삭제하는 로직
export const useDanggnBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const handleVideoEnded: ReactEventHandler<HTMLVideoElement> = () => {
    setIsVideoEnd(true);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    // 모바일에서 영상을 자동재생하려면 저전력모드를 꺼야함
    videoRef.current.addEventListener("suspend", () => {
      alert("저전력 모드를 꺼야 영상이 재생됩니다.");
    });
  }, [videoRef.current]);

  // opacity:0이 duration이 1초가 걸려있는데 duration이 0.95초쯤 지났을때 비디오를 자연스럽게 삭제함
  useEffect(() => {
    if (isVideoEnd) {
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.remove();
        videoRef.current.classList.add("removed");
      }, 950);
    }
  }, [isVideoEnd]);

  return {
    videoRef,
    isVideoEnd,
    handleVideoEnded,
  };
};
