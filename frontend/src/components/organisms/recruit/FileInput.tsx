import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaFilePdf } from "react-icons/fa";
import Input from "../../molecules/inputs/Input";

interface IFileInput {
  register: UseFormRegisterReturn<any>;
  isRequired?: boolean;
  label: string;
  labelId?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  pdfFileName?: string;
}
const FileInput = ({
  register,
  isRequired = false,
  label,
  labelId,
  description,
  placeholder,
  pdfFileName,
  error,
}: IFileInput) => {
  return (
    <Input
      label={label}
      labelId={labelId}
      description={description}
      isRequired={isRequired}
      errorMessage={error && error}
    >
      <div
        className={`relative border-[1px] rounded-lg outline-none border-danggn-lightgray ring-transition`}
      >
        <div className="absolute items-center gap-1 ml-4 -translate-y-1/2 row-box top-1/2 text-danggn-darkgray">
          <FaFilePdf />
          <p>{pdfFileName ? pdfFileName : "파일을 첨부해주세요"}</p>
        </div>

        <input
          {...register}
          type="file"
          accept=".pdf"
          placeholder={placeholder}
          className="w-full h-full p-4 opacity-0 "
        />
      </div>
    </Input>
  );
};

export default FileInput;
