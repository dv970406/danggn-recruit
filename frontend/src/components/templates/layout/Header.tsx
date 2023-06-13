"use client";

import React from "react";
import { HEADER_NAVS_LIST } from "@/src/utils/values/NavsList";
import HeaderNavItem from "../../organisms/layout/HeaderNavItem";
import Image from "next/image";
import Link from "next/link";
import { useResponsiveSize } from "@/src/hooks/shared/ResponsiveSize";

// Header Navigation Template
const Header = () => {
  const { responsiveSize } = useResponsiveSize();
  return (
    <header className="fixed inset-x-0 z-50 px-4 bg-white shadow-md h-14 flex-center ">
      <nav className="items-center w-full h-full between-center sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg ">
        <Link href={"/"}>
          <Image
            width={responsiveSize !== "sm" ? 130 : 25}
            height={25}
            src={
              responsiveSize !== "sm"
                ? "/danggn/danggn.png"
                : "/danggn/nodata-logo.png"
            }
            alt="danggn"
            // 로고는 선순위 로드 사항
            priority
          />
        </Link>

        <ul className="gap-8 row-box">
          {HEADER_NAVS_LIST.map((nav) => (
            <HeaderNavItem {...nav} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
