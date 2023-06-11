import React from "react";
import Loader from "../../atomics/Loader";

interface ISubmitButton {
  disabled?: boolean;
  onClick: () => any;
  isLoading?: boolean;
  text: string;
}

// 폼 제출시 사용할 버튼
const SubmitButton = ({
  disabled = false,
  isLoading = false,
  onClick,
  text,
}: ISubmitButton) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`w-full p-4 text-white rounded-lg bg-danggn-orange transition-colors disabled:opacity-30 disabled:pointer-events-none `}
      onClick={onClick}
    >
      {isLoading ? <Loader isButton color="white" /> : text}
    </button>
  );
};

export default SubmitButton;
