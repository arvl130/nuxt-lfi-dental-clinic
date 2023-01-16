import { DateTime } from "luxon"
import { ParameterError } from "./errors"

export function getDate(year, month, date) {
  const isoDateStr = DateTime.fromObject(
    {
      year,
      month,
      day: date,
    },
    {
      timezone: "Asia/Manila",
    }
  ).toISO()
  return new Date(isoDateStr)
}

export function getDateOfTimeslot(timeslot) {
  const result = new Date(parseInt(timeslot) * 1000).toLocaleString("en-us", {
    day: "numeric",
    timeZone: "Asia/Manila",
  })

  return parseInt(result)
}

export function getDateSixMonthsFromNow() {
  const isoDateStrSixMonthsFromNow = DateTime.now().plus({ months: 6 }).toISO()
  return new Date(isoDateStrSixMonthsFromNow)
}

export function getDateToday() {
  const date = new Date()
  const isoDateStr = DateTime.fromObject({
    year: parseInt(
      date.toLocaleString("en-us", {
        timeZone: "Asia/Manila",
        year: "numeric",
      })
    ),
    month: parseInt(
      date.toLocaleString("en-us", {
        timeZone: "Asia/Manila",
        month: "numeric",
      })
    ),
    day: parseInt(
      date.toLocaleString("en-us", {
        timeZone: "Asia/Manila",
        day: "numeric",
      })
    ),
  }).toISO()

  return new Date(isoDateStr)
}

export function getDateTomorrow() {
  const date = new Date()
  const isoDateStrTomorrow = DateTime.fromObject({
    year: parseInt(
      date.toLocaleString("en-us", {
        timeZone: "Asia/Manila",
        year: "numeric",
      })
    ),
    month: parseInt(
      date.toLocaleString("en-us", {
        timeZone: "Asia/Manila",
        month: "numeric",
      })
    ),
    day:
      parseInt(
        date.toLocaleString("en-us", {
          timeZone: "Asia/Manila",
          day: "numeric",
        })
      ) + 1,
  }).toISO()
  return new Date(isoDateStrTomorrow)
}

export function getDateTwoDaysBeforeTimeslot(slotSeconds) {
  const date = new Date(slotSeconds * 1000)
  const month = date.toLocaleString("en-us", {
    timeZone: "Asia/Manila",
    month: "numeric",
  })
  const day = date.toLocaleString("en-us", {
    timeZone: "Asia/Manila",
    day: "numeric",
  })
  const year = date.toLocaleString("en-us", {
    timeZone: "Asia/Manila",
    year: "numeric",
  })

  const isoDateStr = DateTime.fromObject({
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  })
    .minus({ days: 2 })
    .toISO()

  return new Date(isoDateStr)
}

const monthNames = [
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
]

export function getMonthIndex(monthName) {
  return monthNames.indexOf(monthName)
}

export function getMonthName(monthIndex) {
  return monthNames[monthIndex]
}

export function getFirstDateOfMonth(monthName, year) {
  if (!monthName) throw new ParameterError(monthName)
  if (!year) throw new ParameterError(year)

  const month = getMonthIndex(monthName)
  return new Date(year, month, 1)
}

export function getFirstDateOfNextMonth(monthName, year) {
  const month = getMonthIndex(monthName)
  return new Date(year, month + 1, 1)
}

export function getHoursMinutesOfTimeslot(timeslot) {
  const fullTime = new Date(timeslot * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(",")[1]

  const hours = fullTime.split(":")[0]
  const minutes = fullTime.split(":")[1]
  const ampm = fullTime.split(" ")[2]
  return `${hours}:${minutes} ${ampm}`
}

export function getMonthDayYearOfTimeslot(timeslot) {
  return new Date(timeslot * 1000).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  })
}

export function getNumOfDaysInMonth(monthName, year) {
  if (!monthName) throw new ParameterError(monthName)
  if (!year) throw new ParameterError(year)
  if (monthName < 0) throw new ParameterError(monthName, "Negative value")
  if (year < 0) throw new ParameterError(year, "Negative value")

  const month = getMonthIndex(monthName)

  // Explanation:
  // Months in the Date object are zero-based, meaning January is 0,
  // February is 1, March is 2, and so on.
  //
  // However, if we pass zero to the date parameter in the constructor,
  // it will give us the last day of the previous month. Hence, we pass
  // pass the index of the next month, then pass 0 to get the last
  // day of our current month.
  return new Date(year, month + 1, 0).getDate()
}

export function getOffsetFromFirstDayOfMonth(monthName, year) {
  if (!monthName) throw new ParameterError(monthName)
  if (!year) throw new ParameterError(year)
  if (monthName < 0) throw new ParameterError(monthName, "Negative value")
  if (year < 0) throw new ParameterError(year, "Negative value")

  const month = getMonthIndex(monthName)

  // Explanation:
  // Here, we explicitly want to access the dates of the current month,
  // so don't mess with the month parameter.
  //
  // Days of the week also start with zero (Sunday), but we ignore
  // that because we want to get the number of blank days before the
  // first date.
  return new Date(year, month, 1).getDay()
}

export function getUnixSecondsFromObject(day, month, year, hours, minutes) {
  const dateStringISO = DateTime.fromObject(
    {
      day,
      // Luxon does not use month indexes so make
      // sure to use the correct month numbers.
      month,
      year,
      hours,
      minutes,
    },
    {
      // system supports UTC+8 only
      zone: "Asia/Manila",
    }
  ).toISO()

  return new Date(dateStringISO).getTime() / 1000
}
