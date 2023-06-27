"use client";

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

    return () => {
      if (!imageRef.current) return;
      observer.unobserve(imageRef?.current!);
    };
  }, []);

  // 메모이징 안하면 부모에서 parallaxMove가 리렌더링되면서 랜덤값들도 전부 리렌더링이 일어나서 버그걸림
  const randomParallaxThreshold = useMemo(
    () => Math.ceil((Math.random() - 0.5) * 80),
    []
  );

  // 사진이 나타날 방향에 대한 애니메이션을 랜덤으로 부여
  const getRandomAnimation = useMemo(() => {
    const randomAppearAnimations = [
      "animate-appear-left-to-right",
      "animate-appear-right-to-left",
      "animate-appear-bottom-to-top",
    ];
    return randomAppearAnimations[Math.floor(Math.random() * 3)];
  }, []);

  return (
    // 동적인 값은 Tailwind로 주면 버그가 일어나는 경우가 흔해서 style로 작성함.
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
