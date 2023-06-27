import React, { ChangeEventHandler } from "react";

interface ISelect {
  options: React.ReactNode;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}
const Select = ({ options, onChange, value, name }: ISelect) => {
  return (
    <select
      className="w-full p-2 rounded-lg outline-none backdrop-blur-md ring-transition"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options}
    </select>
  );
};

export default Select;
