import React from "react";

interface IInput {
  labelId?: string;
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
  description?: string;
  children: React.ReactNode;
}
const Input = ({
  label,
  labelId,
  isRequired = false,
  errorMessage,
  description,
  children,
}: IInput) => {
  return (
    <div className="gap-2 column-box">
      <div className="items-center gap-2 row-box">
        <h3>
          <label htmlFor={labelId} className="cursor-pointer">
            {label}
          </label>
        </h3>
        {isRequired && (
          <div className="w-2 h-2 rounded-full bg-danggn-orange" />
        )}
      </div>
      {children}

      <p className="h-8 text-error">{errorMessage}</p>
      <p className="text-danggn-darkgray text-sub">{description}</p>
    </div>
  );
};

export default Input;
