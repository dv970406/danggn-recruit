import React from "react";

interface IListItem {
  label: string;
  value?: string;
  elementValue?: React.ReactNode;
}
const ListItem = ({ label, value, elementValue }: IListItem) => {
  return (
    <li className="border-b-[1px] py-4 between-center border-b-danggn-lightgray">
      <p className="text-sub text-danggn-darkgray">{label}</p>
      {value && <p className="text-main">{value}</p>}
      {elementValue && elementValue}
    </li>
  );
};

export default ListItem;
