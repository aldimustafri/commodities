/* eslint-disable no-unused-expressions */
export function DateFormat(val, type) {
  const date = new Date(val);
  const dayName = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const monthName = [
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
  ];

  const day = dayName[date.getDay()];
  const dateTime = date.getDate();
  const month = date.getMonth() + 1;
  const indexMonth = date.getMonth();
  const year = date.getUTCFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (type === "datetimeday") {
    return (
      `${day
      }, ${
        dateTime
      } ${
        monthName[indexMonth]
      } ${
        year
      } ${
        hour
      }:${
        minute}`
    );
  } if (type === "datetime") {
    return (
      `${day} ${monthName[indexMonth]} ${year} ${hour}:${minute}`
    );
  } if (type === "dateday") {
    return `${day}, ${dateTime} ${monthName[indexMonth]} ${year}`;
  } if (type === "date") {
    return `${dateTime} ${monthName[indexMonth]} ${year}`;
  }
  if (type === "monthYear") {
    return `${monthName[indexMonth]} ${year}`;
  } if (type === "time") {
    return `${hour}:${minute}`;
  } if (type === "meta") {
    if (date.toString().length < 2) {
      dateTime === `0${dateTime}`;
    }

    if (month.toString().length < 2) {
      month === `0${month}`;
    }
    return `${year}:${month}:${date}`;
  }
}

export default DateFormat;
