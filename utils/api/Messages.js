import { HttpError, ParameterError } from "../errors"
import backendBaseURL from "./backendBaseURL"

export async function deleteMessage(messageUid) {
  const link = `${backendBaseURL}/messages/${messageUid}/delete`
  const response = await fetch(link, {
    method: "DELETE",
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function toggleMessageArchiveStatus(messageUid) {
  const link = `${backendBaseURL}/messages/${messageUid}`
  const response = await fetch(link, {
    method: "PATCH",
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function getAllMessages() {
  const link = `${backendBaseURL}/messages`
  const response = await fetch(link)
  const data = await response.json()
  return data.payload
}

export async function createMessage(message) {
  const { senderName, email, body } = message

  if (!senderName) throw new ParameterError(senderName)
  if (!email) throw new ParameterError(email)
  if (!body) throw new ParameterError(body)

  const link = `${backendBaseURL}/messages`
  const response = await fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}
