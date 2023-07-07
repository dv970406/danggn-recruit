"use client";
import { serviceIdState } from "@/src/utils/recoil/service";
import React from "react";
import { useRecoilState } from "recoil";
import ServiceButton from "../../organisms/service/ServiceButton";
import { SERVICES_DETAIL_LIST } from "@/src/jsons/ServicesDetailList";

// /service
// 당근마켓의 서비스들을 아이콘 버튼으로 띄워주는 Template(작은 화면용 - 반응형)
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
