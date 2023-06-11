interface IHorizontalDivider {
  isNarrow?: boolean;
}

// 구분선 역할
export const HorizontalDivider = ({ isNarrow = false }: IHorizontalDivider) => {
  return (
    <hr
      className={`bg-danggn-lightgray w-full ${
        isNarrow ? "my-1" : "my-3"
      } h-px `}
    />
  );
};

export const CircleDivider = () => {
  return (
    <div className="w-[4px] h-[4px] rounded-full mx-3 my-auto bg-danggn-darkgray " />
  );
};
