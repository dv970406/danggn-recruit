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
          {/* 동적인 이미지는 레이아웃 시프트 방지를 위해 div에 Image width만큼 min-width를 걸어놓음 */}
          <div className="relative object-cover border-transparent aspect-video flex-center max-w-[400px] max-h-[300px]">
            {SERVICES_DETAIL_LIST.map((serviceDetail) => (
              <>
                {/* 첫번째 <Image/>는 동적인 이미지가 로드될 때 공백을 막기 위해 미리 preload해두기 위해 정적으로 세팅해둔 Image임 */}
                <Image
                  width={400}
                  height={300}
                  placeholder="blur"
                  src={`/service/${serviceDetail.id}.png`}
                  alt={serviceDetail?.id || "danggn"}
                  className={`invisible absolute top-0 left-0`}
                />

                <Image
                  src={`/service/${serviceDetail.id}.png`}
                  width={400}
                  height={300}
                  placeholder="blur"
                  alt={serviceDetail?.id || "danggn"}
                  className={`w-auto h-auto ${
                    selectedService?.id === serviceDetail.id
                      ? "block"
                      : "hidden"
                  }`}
                />
              </>
            ))}
          </div>
          <div className="w-full gap-4 lg:w-auto column-box">
            <div className="items-end justify-between gap-24 row-box lg:column-box">
              <div className="relative p-2 rounded-md shadow-md ">
                {SERVICES_DETAIL_LIST.map((serviceDetail) => (
                  <>
                    {/* 첫번째 <Image/>는 동적인 이미지가 로드될 때 공백을 막기 위해 미리 preload해두기 위해 정적으로 세팅해둔 Image임 */}
                    <Image
                      width={40}
                      height={40}
                      placeholder="blur"
                      src={`/service/${serviceDetail.id}-symbol.png`}
                      alt={`${serviceDetail?.id || "danggn"}-symbol`}
                      className={`invisible absolute top-0 left-0`}
                    />
                    <Image
                      src={`/service/${serviceDetail.id}-symbol.png`}
                      width={40}
                      height={40}
                      placeholder="blur"
                      alt={`${serviceDetail?.id || "danggn"}-symbol`}
                      className={`w-auto h-auto ${
                        selectedService?.id === serviceDetail.id
                          ? "block"
                          : "hidden"
                      }`}
                    />
                  </>
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
