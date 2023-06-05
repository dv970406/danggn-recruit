import CanvasWrapper from "@/src/components/templates/service/CanvasWrapper";
import ServiceCanvas from "@/src/components/templates/service/ServiceCanvas";
import ServiceChoice from "@/src/components/templates/service/ServiceChoice";
import ServiceDescription from "@/src/components/templates/service/ServiceDescription";
import React from "react";

export const metadata = {
  title: "서비스",
};
const ServicePage = () => {
  return (
    <article className="relative layout flex-center column-box">
      <CanvasWrapper>
        <ServiceCanvas />
      </CanvasWrapper>
      <ServiceDescription />
      <ServiceChoice />
    </article>
  );
};

export default ServicePage;
