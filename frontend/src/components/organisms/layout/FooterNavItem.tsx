import Link from "next/link";
import React from "react";

interface IFooterNavItem {
  href: string;
  icon: React.ReactElement;
}
const FooterNavItem = ({ href, icon }: IFooterNavItem) => {
  return (
    <li>
      <Link href={href} className={"text-orange-transition"} target="_blank">
        {icon}
      </Link>
    </li>
  );
};

export default FooterNavItem;
