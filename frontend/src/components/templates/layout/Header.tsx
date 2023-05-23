import Link from "next/link";
import React from "react";
import { TbBinaryTree2, TbBrandReact, TbCategory } from "react-icons/tb";

const NAVS_LIST = [
  {
    label: "소",
    href: "introduction",
  },
  {
    label: "채",
    href: "recruit",
  },
  {
    label: "서",
    href: "service",
  },
  {
    label: "Q",
    href: "qna",
  },
];
const Header = () => {
  return (
    <header className="h-14 fixed inset-x-0 bg-white z-50 border-b-[1.5px] flex-center border-b-danggn-orange px-2">
      <div className="w-full flex-center between-center sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
        <div></div>
        <nav className="">
          <ul className="gap-4 row-box">
            {NAVS_LIST.map((nav) => (
              <li className="text-danggn-orange">
                <Link href={nav.href}>{nav.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
