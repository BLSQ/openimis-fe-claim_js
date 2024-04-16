export function splitISODate(date) {
  return {
    year: date.substring(0, 4),
    month: date.substring(5, 7),
    day: date.substring(8, 10),
    hours: date.substring(11, 13),
    minutes: date.substring(14, 16),
    seconds: date.substring(17, 19)
  };
}
