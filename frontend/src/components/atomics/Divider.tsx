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

export const VerticalDivider = () => {
  return <div className="w-px h-full mx-3 bg-danggn-darkgray" />;
};
