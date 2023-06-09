import React from "react";
import HeaderNavItem from "../../organisms/layout/HeaderNavItem";
import Image from "next/image";
import Link from "next/link";
import { HEADER_NAVS_LIST } from "@/src/jsons/NavsList";

// Header Navigation Template
const Header = () => {
  return (
    <header className="fixed inset-x-0 z-50 px-4 bg-white shadow-md h-14 flex-center ">
      <nav className="items-center w-full h-full between-center sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg ">
        <Link href={"/"}>
          <Image
            width={130}
            height={70}
            src={"/danggn/danggn.png"}
            alt="danggn"
            // 로고는 선순위 로드 사항
            priority
            className={"hidden sm:block"}
          />
          <Image
            width={25}
            height={25}
            src={"/danggn/nodata-logo.png"}
            alt="danggn"
            // 로고는 선순위 로드 사항
            priority
            className={`block sm:hidden`}
          />
        </Link>

        <ul className="gap-8 row-box">
          {HEADER_NAVS_LIST.map((nav) => (
            <HeaderNavItem key={nav.id} {...nav} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
