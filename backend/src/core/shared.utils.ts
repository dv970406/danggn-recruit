// XXXX년 XX월 XX일 XX시 XX분 XX초
export const getCreatedDateFormat = (time: Date | number) => {
  const parsedDate = new Date(time);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const date = parsedDate.getDate();
  const hour = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  const second = parsedDate.getSeconds().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${date}일 ${hour}시 ${minutes}분 ${second}초`;
};
