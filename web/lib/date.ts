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
