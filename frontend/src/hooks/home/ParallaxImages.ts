import { MouseEventHandler, useEffect, useRef, useState } from "react";

export const useParallaxImages = () => {
  const [parallaxMove, setParallaxMove] = useState({ x: 0, y: 0 });

  const ulRef = useRef<HTMLUListElement>(null);
  const handleMouseMove: MouseEventHandler<HTMLUListElement> = (event) => {
    const x = event.clientX / ulRef.current?.clientWidth!;
    const y = event.clientY / ulRef.current?.clientHeight!;

    setParallaxMove({ x, y });
  };

  return {
    parallaxMove,
    ulRef,
    handleMouseMove,
  };
};
