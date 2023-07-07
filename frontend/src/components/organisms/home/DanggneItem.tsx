import Image from "next/image";
import React from "react";

interface IDanggneItem {
  danggne: string;
}
const DanggneItem = ({ danggne }: IDanggneItem) => {
  return (
    <li className={`relative h-screen`}>
      <Image
        className="object-contain "
        src={`/danggn/${danggne}.jpeg`}
        alt={danggne}
        fill
        sizes="600px"
      />
    </li>
  );
};

export default DanggneItem;
