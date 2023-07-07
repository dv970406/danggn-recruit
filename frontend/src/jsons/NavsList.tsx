import { FaFacebook, FaGithub, FaInstagram, FaMedium } from "react-icons/fa";

export const HEADER_NAVS_LIST = [
  {
    id: "recruit",
    label: "채용",
    href: "/recruit",
  },
  {
    id: "service",
    label: "서비스",
    href: "/service",
  },
  {
    id: "resume",
    label: "내 지원현황",
    href: "/resume/auth",
  },
];

export const FOOTER_NAVS_LIST = [
  {
    id: "github",
    icon: <FaGithub size={30} />,
    href: `https://github.com/daangn`,
  },
  {
    id: "medium",
    icon: <FaMedium size={30} />,
    href: `https://medium.com/daangn`,
  },
  {
    id: "facebook",
    icon: <FaFacebook size={30} />,
    href: `https://www.facebook.com/daangn`,
  },
  {
    id: "instagram",
    icon: <FaInstagram size={30} />,
    href: `https://www.instagram.com/daangnmarket`,
  },
];
