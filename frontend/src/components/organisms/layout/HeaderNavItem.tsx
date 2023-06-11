"use client";
import { getHeaderNavIcon } from "@/src/utils/func/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderNavItem {
  id: string;
  href: string;
  label: string;
}

// Header의 네비게이션 요소
const HeaderNavItem = ({ id, href, label }: HeaderNavItem) => {
  const pathname = usePathname();
  return (
    <li
      key={id}
      className={`hover:text-danggn-darkgray transition-colors duration-300 ${
        pathname.includes(id) ? "text-danggn-orange" : "text-black"
      }`}
    >
      <Link href={href}>
        <p className="hidden sm:block">{label}</p>
        <i className="block sm:hidden"> {getHeaderNavIcon(id)}</i>
      </Link>
    </li>
  );
};

export default HeaderNavItem;
