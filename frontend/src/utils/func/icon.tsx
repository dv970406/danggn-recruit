import { FaDochub, FaHome, FaServicestack, FaUserPlus } from "react-icons/fa";

export const getIcon = (id: string) => {
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
