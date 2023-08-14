export const whatIsToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    String(date.getMonth() + 1).length === 2
      ? String(date.getMonth() + 1)
      : "0" + String(date.getMonth() + 1);
  const day =
    String(date.getDate()).length === 2 ? String(date.getDate()) : "0" + String(date.getDate());
  const todayDate = year + "-" + month + "-" + day;
  return todayDate;
};
