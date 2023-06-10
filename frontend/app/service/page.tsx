import Service3DCanvas from "@/src/components/templates/service/Service3DCanvas";
import ServiceChoice from "@/src/components/templates/service/ServiceChoice";
import ServiceDescription from "@/src/components/templates/service/ServiceDescription";
import CanvasWrapper from "@/src/components/templates/shared/CanvasWrapper";
import React from "react";

export const metadata = {
  title: "서비스",
};

// /service Page 렌더링 방식 : SSG
// 변동되는 데이터 없음
const ServicePage = () => {
  return (
    <article className="relative layout flex-center column-box">
      <CanvasWrapper>
        <Service3DCanvas />
      </CanvasWrapper>
      <ServiceDescription />
      <ServiceChoice />
    </article>
  );
};

export default ServicePage;
