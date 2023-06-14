"use client";
import { serviceIdState, serviceSelector } from "@/src/utils/recoil/service";
import { SERVICES_DETAIL_LIST } from "@/src/utils/values/ServicesDetailList";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { FaArrowDown } from "react-icons/fa";

// /service
// 3D오브젝트 혹은 아이콘버튼을 클릭했을 때 그에 해당하는 서비스의 정보를 띄워주는 Template
const ServiceDescription = () => {
  const selectedService = useRecoilValue(serviceSelector);

  return (
    <section className="relative top-0 w-full h-full gap-10 mx-auto lg:absolute lg:justify-between column-box lg:flex-row flex-center">
      {selectedService ? (
        <>
          {/* 원래라면 동적으로 로드되어야할 이미지만 최대한 정적으로 로드하기 위해 Image를 모두 걸어놓은 후 visible-invisible로 컨트롤*/}{" "}
          {/* display:hidden은 이미지를 로드하지 않아서 visibility:hidden를 함께 사용 */}
          <div className="relative object-cover border-transparent aspect-video flex-center">
            {SERVICES_DETAIL_LIST.map((serviceDetail) => (
              <Image
                src={`/service/${serviceDetail.id}.png`}
                width={450}
                height={450}
                alt={serviceDetail?.id || "danggn"}
                className={`w-auto h-auto ${
                  selectedService?.id === serviceDetail.id
                    ? "visible"
                    : "invisible hidden"
                }`}
              />
            ))}
          </div>
          <div className="w-full gap-4 lg:w-auto column-box">
            <div className="items-end justify-between gap-24 row-box lg:column-box">
              {/* 원래라면 동적으로 로드되어야할 이미지만 최대한 정적으로 로드하기 위해 Image를 모두 걸어놓은 후 visible-invisible로 컨트롤 */}
              {/* display:hidden은 이미지를 로드하지 않아서 visibility:hidden를 함께 사용 */}
              <div className="p-2 rounded-md shadow-md ">
                {SERVICES_DETAIL_LIST.map((serviceDetail) => (
                  <Image
                    src={`/service/${serviceDetail.id}-symbol.png`}
                    width={40}
                    height={40}
                    alt={`${serviceDetail?.id || "danggn"}-symbol`}
                    className={`w-auto h-auto ${
                      selectedService?.id === serviceDetail.id
                        ? "visible"
                        : "invisible hidden"
                    }`}
                  />
                ))}
              </div>
              <h2 className="text-right text-title">
                {selectedService?.title}
              </h2>
            </div>
            <p className="leading-6 text-left break-words text-danggn-darkgray text-sub sm:max-w-[470px] lg:text-right whitespace-pre-wrap">
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
