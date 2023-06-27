import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Input from "../../molecules/inputs/Input";

interface IRadiosInput {
  labelId: string;
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
  labelId,
  register,
  label,
  isRequired,
  radioList,
  description,
  selectedValue,
}: IRadiosInput) => {
  return (
    <Input
      label={label}
      labelId={labelId}
      description={description}
      isRequired={isRequired}
    >
      <ul className="flex-wrap gap-x-8 gap-y-2 row-box">
        {radioList?.map((radio) => (
          <li key={radio.value} className="gap-1 group flex-center">
            <input
              {...register}
              type="radio"
              name={labelId}
              // label과 연결하기 위해 완전히 unique값인거 부여해야 함. 따라서 labelId + radio.value
              id={labelId + radio.value}
              value={radio.value}
              hidden
            />

            <label
              htmlFor={labelId + radio.value}
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
    </Input>
  );
};

export default RadiosInput;
