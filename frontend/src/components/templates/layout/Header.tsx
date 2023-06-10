import React from "react";
import { HEADER_NAVS_LIST } from "@/src/utils/values/NavsList";
import HeaderNavItem from "../../organisms/layout/HeaderNavItem";

const Header = () => {
  return (
    <header className="fixed inset-x-0 z-50 px-4 bg-white shadow-md h-14 flex-center">
      <div className="w-full between-center sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <div></div>
        <nav>
          <ul className="gap-8 row-box">
            {HEADER_NAVS_LIST.map((nav) => (
              <HeaderNavItem {...nav} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
