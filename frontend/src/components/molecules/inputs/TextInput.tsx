import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ITextInput {
  register: UseFormRegisterReturn<any>;
  fieldId: string;
  isRequired?: boolean;
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
}
const TextInput = ({
  fieldId,
  register,
  isRequired = false,
  label,
  error,
  description,
  placeholder,
}: ITextInput) => {
  return (
    <div className="gap-2 column-box">
      <div className="items-center gap-2 row-box">
        <h3>
          <label htmlFor={fieldId} className="cursor-pointer">
            {label}
          </label>
        </h3>
        {isRequired && (
          <div className="w-2 h-2 rounded-full bg-danggn-orange" />
        )}
      </div>
      {/* tailwind ring써보기 */}
      <input
        {...register}
        id={fieldId}
        placeholder={placeholder}
        className={`outline-none p-4 border-[1px] rounded-lg border-danggn-lightgray ring-transition`}
      />

      <p className="h-8 text-error">{error && error}</p>
      <p className="text-danggn-darkgray text-sub">{description}</p>
    </div>
  );
};

export default TextInput;
