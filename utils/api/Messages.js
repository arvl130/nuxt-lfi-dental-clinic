import { getUserToken } from "../auth/user-token"
import { HttpError, ParameterError } from "../errors"
import backendBaseURL from "./backendBaseURL"

export async function deleteMessage(messageUid) {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/messages/${messageUid}/delete`
  const response = await fetch(link, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function toggleMessageArchiveStatus(messageUid) {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/messages/${messageUid}`
  const response = await fetch(link, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function getAllMessages() {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/messages`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
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
