import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaFilePdf } from "react-icons/fa";

interface IFileInput {
  register: UseFormRegisterReturn<any>;
  isRequired?: boolean;
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  pdfFileName?: string;
}
const FileInput = ({
  register,
  isRequired = false,
  label,
  description,
  placeholder,
  pdfFileName,
}: IFileInput) => {
  return (
    <div className="gap-2 column-box">
      <div className="items-center gap-2 row-box">
        <h3>{label}</h3>
        {isRequired && (
          <div className="w-2 h-2 rounded-full bg-danggn-orange" />
        )}
      </div>

      <div
        className={`relative border-[1px] rounded-lg outline-none border-danggn-lightgray ring-transition`}
      >
        <div className="absolute items-center gap-1 ml-4 -translate-y-1/2 row-box top-1/2 text-danggn-darkgray">
          <FaFilePdf />
          <p>{pdfFileName ? pdfFileName : "파일을 첨부해주세요"}</p>
        </div>
        {/* input을 div보다 아래 놔둬야 순서상 위 div 박스보다 위로감 */}
        <input
          {...register}
          type="file"
          accept=".pdf"
          placeholder={placeholder}
          className="w-full h-full p-4 opacity-0 "
        />
      </div>

      {/* <p className="h-8 font-semibold text-red-500">{error && error}</p> */}
      <p className="text-danggn-darkgray text-sub">{description}</p>
    </div>
  );
};

export default FileInput;
