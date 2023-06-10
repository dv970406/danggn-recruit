import React from "react";

interface ITitle {
  text: string;
  isPositionEnd?: boolean;
}
const Title = ({ text, isPositionEnd = false }: ITitle) => {
  return (
    <h1
      className={`text-title leading-snug ${isPositionEnd && "place-self-end"}`}
    >
      {text}
    </h1>
  );
};

export default Title;
