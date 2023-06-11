"use client";
import { DANGGN_SERVICE_LIST_FOR_SCROLL } from "@/src/utils/values/DanggnServiceList";
import React from "react";
import { useScrollServices } from "@/src/hooks/home/ScrollServices";
import DanggnServiceItem from "../../organisms/home/DanggnServiceItem";

// HomePage의 스크롤을 내릴때마다 Service 아이템에 불이 들어오는 Template
const ScrollDanggnServices = () => {
  const { danggnServicesSectionRef, focusedItem } = useScrollServices();

  return (
    <section className="p-20 w-hull flex-center" ref={danggnServicesSectionRef}>
      <ul className="gap-2 column-box">
        {DANGGN_SERVICE_LIST_FOR_SCROLL.map(({ label, id }) => (
          <DanggnServiceItem
            key={id}
            label={label}
            id={id}
            isFocusing={focusedItem === label}
          />
        ))}
      </ul>
    </section>
  );
};

export default ScrollDanggnServices;
