import { DateTime } from "luxon"

export function getDateTwoDaysBeforeTimeslot(slotSeconds: number) {
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

export function getMonthSecondsFromSlotSeconds(slotSeconds: number) {
  const month = new Date(slotSeconds * 1000).toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "numeric",
  })

  const year = new Date(slotSeconds * 1000).toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
  })

  const isoDateStr = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
    },
    {
      zone: "Asia/Manila",
    }
  ).toISO()

  return new Date(isoDateStr).getTime() / 1000
}

export function getUnixTimestampFromMonthAndYear(year: string, month: string) {
  const currMonthISODateStr = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
    },
    {
      zone: "Asia/Manila",
    }
  ).toISO()
  return new Date(currMonthISODateStr).getTime() / 1000
}
