"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface INavigationButton {
  path: string;
}
const NavigationButton = ({ path }: INavigationButton) => {
  const { push } = useRouter();
  return (
    <button className="p-1" onClick={() => push(path)}>
      <FaArrowLeft
        size={24}
        className="transition-colors hover:text-danggn-darkgray"
      />
    </button>
  );
};

export default NavigationButton;
