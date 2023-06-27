import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../../molecules/inputs/Input";

interface ITextInput {
  register: UseFormRegisterReturn<any>;
  labelId: string;
  isRequired?: boolean;
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
}
const TextInput = ({
  labelId,
  register,
  isRequired = false,
  label,
  error,
  description,
  placeholder,
}: ITextInput) => {
  return (
    <Input
      label={label}
      labelId={labelId}
      description={description}
      errorMessage={error && error}
      isRequired={isRequired}
    >
      <input
        {...register}
        id={labelId}
        placeholder={placeholder}
        className={`outline-none p-4 border-[1px] rounded-lg border-danggn-lightgray ring-transition`}
      />
    </Input>
  );
};

export default TextInput;
