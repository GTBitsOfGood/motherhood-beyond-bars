/**
 * Formats a date to a useful, nice method
 * @param date string
 * @returns {string} a formatted date
 */
export function formatDate(date: string) {
  // format date as November 1, 2019
  const d = new Date(date);
  const dateString = d.toLocaleString("default", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  return dateString;
}

export function numberFormatDate(date: Date, separator = "/") {
  return `${date.getUTCMonth() + 1}${separator}${date.getUTCDate()}${separator}${date.getUTCFullYear()}`;
}

export function monthIndexToString(index: number | string) {
  const number = parseInt(index as string);
  if (isNaN(number) || number < 0 || number > 11) return "Not a Month";

  const INDEX_TO_MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const;

  return INDEX_TO_MONTH[number];
}
