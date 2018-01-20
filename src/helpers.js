monthNames = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

export function getMonthName(num) {
  return monthNames[parseInt(num)];
}

export function getMonthYear(input) {
  /* input in YYYY_MM format */
  year = input.substring(0, 4)
  month = input.substring(5, 7)
  return monthNames[parseInt(month)]+' / '+year;
}
