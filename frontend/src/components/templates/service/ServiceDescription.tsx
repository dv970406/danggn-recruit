"use client";
import { serviceIdState } from "@/src/utils/recoil/service";
import { SERVICES_DETAIL_LIST } from "@/src/utils/values/ServicesDetailList";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { FaArrowDown } from "react-icons/fa";
const ServiceDescription = () => {
  const serviceId = useRecoilValue(serviceIdState);

  const selectedService = SERVICES_DETAIL_LIST.find(
    (service) => service.id === serviceId
  );

  return (
    <section className="justify-between w-full gap-10 column-box lg:flex-row flex-center">
      {serviceId ? (
        <>
          <div className="relative object-cover aspect-video">
            <Image
              src={`/service/${selectedService?.id}.png`}
              width={450}
              height={400}
              alt={selectedService?.id || "danggn"}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className="gap-4 column-box ">
            <div className="items-end justify-between gap-24 row-box lg:column-box">
              <div className="p-2 rounded-md shadow-md ">
                <Image
                  src={`/service/${selectedService?.id}-symbol.png`}
                  width={50}
                  height={50}
                  alt={`${selectedService?.id || "danggn"}-symbol`}
                />
              </div>
              <h2 className="text-right text-title">
                {selectedService?.title}
              </h2>
            </div>
            <p className="leading-6 text-left break-words text-danggn-darkgray text-sub sm:max-w-[450px] lg:text-right">
              {selectedService?.description}
            </p>
          </div>
        </>
      ) : (
        <div className="w-full gap-4 column-box flex-center">
          <h2 className="text-subtitle text-danggn-darkgray ">
            아래 당근의 서비스를 클릭해보세요!
          </h2>
          <FaArrowDown
            className="animate-bounce text-danggn-orange"
            size={24}
          />
        </div>
      )}
    </section>
  );
};

export default ServiceDescription;
