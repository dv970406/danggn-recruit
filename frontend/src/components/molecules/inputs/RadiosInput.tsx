import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IRadiosInput {
  fieldId: string;
  register: UseFormRegisterReturn<any>;
  label: string;
  isRequired?: boolean;
  radioList?: {
    label: string;
    value: string;
  }[];
  description?: string;
  selectedValue?: string;
}
const RadiosInput = ({
  fieldId,
  register,
  label,
  isRequired,
  radioList,
  description,
  selectedValue,
}: IRadiosInput) => {
  return (
    <div className="gap-2 column-box">
      <div className="items-center gap-2 row-box">
        <h3>{label}</h3>
        {isRequired && (
          <div className="w-2 h-2 rounded-full bg-danggn-orange" />
        )}
      </div>

      <ul className="flex-wrap gap-x-8 gap-y-2 row-box">
        {radioList?.map((radio) => (
          <li key={radio.value} className="gap-1 group flex-center">
            <input
              {...register}
              type="radio"
              name={fieldId}
              // label과 연결하기 위해 완전히 unique값인거 부여해야 함. 따라서 fieldId + radio.value
              id={fieldId + radio.value}
              value={radio.value}
              hidden
            />

            <label
              htmlFor={fieldId + radio.value}
              className="items-center gap-2 cursor-pointer row-box"
            >
              <div
                className={`rounded-full transition-colors w-4 h-4 ${
                  selectedValue === radio.value
                    ? "bg-danggn-orange ring-2 ring-offset-2 ring-danggn-orange transition duration-300"
                    : "bg-transparent border-2 border-danggn-darkgray"
                }`}
              />
              <p className="text-sub text-danggn-darkgray">{radio.label}</p>
            </label>
          </li>
        ))}
      </ul>

      <p className="text-danggn-darkgray text-sub">{description}</p>
    </div>
  );
};

export default RadiosInput;
