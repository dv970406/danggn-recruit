export const randomNumBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRgbByHex = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return {
      r: 255,
      g: 0,
      b: 0,
    };
  }
  return {
    r: parseInt(result[1], 16), // FF -> 255
    g: parseInt(result[2], 16), // 00 -> 0
    b: parseInt(result[3], 16), // 00 -> 0
  };
};
