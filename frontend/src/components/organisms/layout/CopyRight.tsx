import React from "react";

interface ICopyRight {
  copyRighter: string;
  copyRighterLink: string;
  description: string;
}
const CopyRight = ({
  copyRighter,
  copyRighterLink,
  description,
}: ICopyRight) => {
  return (
    <p className="text-sub text-danggn-darkgray">
      ⓒ ${new Date().getFullYear()}.
      <a href={copyRighterLink} target="_blank" className="text-accent">
        {copyRighter}
      </a>{" "}
      all rights reserved. - {description}
    </p>
  );
};

export default CopyRight;
