import React from "react";

interface IListWrapper {
  children: React.ReactNode;
}
const ListWrapper = ({ children }: IListWrapper) => {
  return <ul className="w-full gap-4 column-box">{children}</ul>;
};

export default ListWrapper;
