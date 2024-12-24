export function formatDate(ogPostDate) {
  const date = new Date(ogPostDate);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  // to add the date suffix
  let dayWithSuffix;
  if (day === 1 || day === 21 || day === 31) {
    dayWithSuffix = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayWithSuffix = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayWithSuffix = `${day}rd`;
  } else {
    dayWithSuffix = `${day}th`;
  }

  return `${month} ${dayWithSuffix}, ${year}`;
}
