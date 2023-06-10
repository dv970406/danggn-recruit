import { useEffect, useMemo, useRef, useState } from "react";

export const useParallaxImage = () => {
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

  return {
    imageRef,
    isIntersectImage,
    randomParallaxThreshold,
    getRandomAnimation,
  };
};
