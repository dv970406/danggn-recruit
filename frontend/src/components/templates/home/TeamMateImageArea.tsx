"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { PARALLAX_IMAGE_LIST } from "@/src/utils/values/ParallaxImageList";
import ParallaxImageList from "../../organisms/home/ParallaxImageList";
const TeamMateImageArea = () => {
  const [parallaxMove, setParallaxMove] = useState({ x: 0, y: 0 });

  const ulRef = useRef<HTMLUListElement>(null);
  const handleMouseMove: MouseEventHandler<HTMLUListElement> = (event) => {
    const x = event.clientX / ulRef.current?.clientWidth!;
    const y = event.clientY / ulRef.current?.clientHeight!;

    setParallaxMove({ x, y });
  };

  return (
    /* 사진 리스트화해서 엄청 넣어야할듯 */
    <section className="p-4 ">
      <ul
        className="relative h-[2000px]"
        onMouseMove={handleMouseMove}
        ref={ulRef}
      >
        {PARALLAX_IMAGE_LIST.map((image) => (
          <ParallaxImageList
            src={image.src}
            alt={image.alt}
            parallaxMove={parallaxMove}
            position={image.position}
          />
        ))}
      </ul>
    </section>
  );
};

export default TeamMateImageArea;
