"use client";
import { serviceIdState } from "@/src/utils/recoil/service";
import React from "react";
import { useRecoilState } from "recoil";
import ServiceButton from "../../organisms/service/ServiceButton";
import { SERVICES_DETAIL_LIST } from "@/src/utils/values/ServicesDetailList";

const ServiceChoice = () => {
  const [selectedServiceId, setSelectedServiceId] =
    useRecoilState(serviceIdState);

  return (
    <section className="absolute block bottom-4 inset-x-4 lg:hidden">
      <div className="justify-between gap-4 row-box">
        {SERVICES_DETAIL_LIST.map((service) => (
          <ServiceButton
            key={service.id}
            serviceId={service.id}
            selectedServiceId={selectedServiceId}
            handleSelectedServiceId={() => setSelectedServiceId(service.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceChoice;
