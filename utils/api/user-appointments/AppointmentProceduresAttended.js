import { getUserToken } from "../../auth/user-token"
import { HttpError, ParameterError } from "../../errors"
import backendBaseURL from "../backendBaseURL"

export async function setUserAppointmentAttended(patientUid, slotSeconds) {
  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/attended`
  const response = await fetch(link, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setUserAppointmentNotAttended(patientUid, slotSeconds) {
  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/attended`
  const response = await fetch(link, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setUserAppointmentPending(patientUid, slotSeconds) {
  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/attended`
  const response = await fetch(link, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}
