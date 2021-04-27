export const yyyymmdd = (dateString) => {
  const date = new Date(dateString);
  const monthValue = date.getMonth() + 1;
  const monthString = monthValue < 10 ? '0' + monthValue : monthValue;
  const dayValue = date.getUTCDate();
  const dayString = dayValue < 10 ? '0' + dayValue : dayValue;
  return `${date.getFullYear()}-${monthString}-${dayString}`;
}