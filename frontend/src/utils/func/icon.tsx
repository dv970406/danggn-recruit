import { FaDochub, FaHome, FaServicestack, FaUserPlus } from "react-icons/fa";

// Header Navigation의 아이콘
export const getHeaderNavIcon = (id: string) => {
  switch (id) {
    case "home":
      return <FaHome size={20} />;
    case "recruit":
      return <FaUserPlus size={20} />;
    case "service":
      return <FaServicestack size={20} />;
    case "resume":
      return <FaDochub size={20} />;
  }
};
