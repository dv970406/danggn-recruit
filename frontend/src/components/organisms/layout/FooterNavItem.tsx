import Link from "next/link";
import React from "react";

interface IFooterNavItem {
  href: string;
  icon: React.ReactElement;
}

// Footer의 아이콘에 사용. 깃허브, 페이스북, 인스타그램, ...
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
