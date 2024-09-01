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

export function monthIndexToString(index: number | string) {
  const number = parseInt(index as string);
  if (!isNaN(number) && (number < 0 || number > 11)) return "Not a Month";
  const INDEX_TO_MONTH: { [key: string]: string } = {
    "0": "January",
    "1": "February",
    "2": "March",
    "3": "April",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "August",
    "8": "September",
    "9": "October",
    "10": "November",
    "11": "December",
  };
  return INDEX_TO_MONTH[index];
}
