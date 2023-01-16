import { getUserToken } from "../auth/user-token"
import { HttpError, ParameterError } from "../errors"
import backendBaseURL from "./backendBaseURL"

export async function getReminders() {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/reminders`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setReminders(message) {
  const idToken = await getUserToken()

  if (!message) throw new ParameterError("message")

  const link = `${backendBaseURL}/reminders`
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}
