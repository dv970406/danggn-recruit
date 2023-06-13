import {
  MouseEventHandler,
  ReactEventHandler,
  TouchEventHandler,
  useRef,
  useState,
} from "react";

// 랜덤한 움직임 좌표를 부여할 것임
export const useParallaxImages = () => {
  const [parallaxMove, setParallaxMove] = useState({ x: 0, y: 0 });

  const ulRef = useRef<HTMLUListElement>(null);

  // 마우스이벤트의 핸들러로 작동할 것임. 마우스를 움직일때마다 달라지는 x,y 값
  const handleMouseMove: ReactEventHandler<HTMLUListElement> = (event: any) => {
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
