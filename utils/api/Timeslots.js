import { HttpError, ParameterError } from "../errors"
import backendBaseURL from "./backendBaseURL"

export function getTimeslots() {
  return [
    [8, 0], // 8:00 AM
    [9, 0], // 9:00 AM
    [10, 0], // 10:00 AM
    [11, 0], // 11:00 AM
    [13, 30], // 1:30 PM
    [15, 0], // 3:00 PM
    [16, 30], // 4:30 PM
    [18, 0], // 6:00 PM
  ]
}

export async function addClosedSlot(slotSeconds) {
  if (!slotSeconds) throw new ParameterError(slotSeconds)

  const link = `${backendBaseURL}/timeslots/closed`
  const response = await fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slotSeconds,
    }),
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function deleteClosedSlot(slotSeconds) {
  if (!slotSeconds) throw new ParameterError(slotSeconds)

  const link = `${backendBaseURL}/timeslots/closed/${slotSeconds}`
  const response = await fetch(link, {
    method: "DELETE",
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function getClosedSlots(year, month) {
  const link = `${backendBaseURL}/timeslots/closed/${year}/${month}`
  const response = await fetch(link)
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function getUnavailableSlots(year, month) {
  const link = `${backendBaseURL}/timeslots/unavailable/${year}/${month}`
  const response = await fetch(link)
  const data = await response.json()
  return data.payload
}
