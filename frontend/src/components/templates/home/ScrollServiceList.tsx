"use client";
import { SERVICE_LIST } from "@/src/utils/values/ServiceList";
import React, { useEffect, useRef, useState } from "react";

const ScrollServiceList = () => {
  const serviceListSectionRef = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState("");

  useEffect(() => {
    // 스크롤 중간쯤부터 애니메이션이 시작되게 하기 위해 전체 문서 크기의 절반을 빼줬음
    const serviceListStartYPosition =
      serviceListSectionRef.current?.offsetTop! -
      document.documentElement.clientHeight / 2;
    const serviceListEndYPosition = 1600;

    const serviceItems = document.querySelectorAll(".service-item");

    const division =
      (serviceListEndYPosition - serviceListStartYPosition) /
      serviceItems.length;

    const scrollEvent = () => {
      setFocusedItem("");

      if (
        window.scrollY > serviceListStartYPosition &&
        window.scrollY < serviceListEndYPosition
      ) {
        const targetIndex = Math.floor(
          (window.scrollY - serviceListStartYPosition) / division
        );

        const targetContent = serviceItems[targetIndex].textContent || "";
        setFocusedItem(targetContent);
      }
    };
    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  const getFullLabel = (icon: string, label: string) => `${icon} ${label}`;
  return (
    <section className="p-20 w-hull flex-center" ref={serviceListSectionRef}>
      <ul className="w-[40rem] column-box gap-2">
        {SERVICE_LIST.map(({ label, icon }) => (
          <li
            key={label}
            className={`text-5xl service-item ${
              focusedItem === getFullLabel(icon, label) &&
              "text-white font-bold"
            }`}
          >
            {getFullLabel(icon, label)}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ScrollServiceList;
