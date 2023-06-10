import { useParallaxImage } from "@/src/hooks/home/ParallaxImage";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface IParallaxImageItem {
  src: string;
  alt: string;
  parallaxMove: {
    x: number;
    y: number;
  };
  position: {
    top: number;
    left: number;
  };
}

// 부모에서 'use client'선언해서 따로 여기서도 작성할 필요는 없음
// 밖에서 parallaxMove state가 마우스를 올릴때마다 항시 변하므로 React.memo로 컴포넌트 메모이징할 필요는 없을 듯
const ParallaxImageItem = ({
  src,
  alt,
  parallaxMove,
  position,
}: IParallaxImageItem) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [isIntersectImage, setIsIntersectImage] = useState(false);

  // 각각의 아이템마다 이벤트를 감지해야 되기에 부모에서 IntersectionObserver를 뿌려줄순없음.
  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersectImage(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(imageRef?.current!);
  }, []);

  // 메모이징 안하면 부모에서 parallaxMove가 리렌더링되면서 랜덤값들도 전부 리렌더링이 일어나서 버그걸림
  const randomParallaxThreshold = useMemo(
    () => Math.ceil((Math.random() - 0.5) * 80),
    []
  );

  // top, left를 랜덤으로 주다보니 사진끼리 겹치는 경우도 생겨서 그냥 고정값으로 줘야할듯..
  // const randomTopPosition = useMemo(
  //   () => Math.floor(Math.random() * (90 - 10 + 1)) + 10,
  //   []
  // );
  // const randomLeftPosition = useMemo(
  //   () => Math.floor(Math.random() * (90 - 10 + 1)) + 10,
  //   []
  // );

  const getRandomAnimation = useMemo(() => {
    const randomAppearAnimations = [
      "animate-appear-left-to-right",
      "animate-appear-right-to-left",
      "animate-appear-bottom-to-top",
    ];
    return randomAppearAnimations[Math.floor(Math.random() * 3)];
  }, []);

  return (
    <li
      style={{
        transform: `translate(${parallaxMove.x * randomParallaxThreshold}px, ${
          parallaxMove.y * randomParallaxThreshold
        }px)`,
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
    >
      <Image
        ref={imageRef}
        src={`/parallax-images/${src}`}
        alt={alt}
        className={`opacity-0 rounded-md ${
          isIntersectImage && getRandomAnimation
        } h-auto w-auto`}
        width={300}
        height={300}
      />
    </li>
  );
};

export default ParallaxImageItem;
