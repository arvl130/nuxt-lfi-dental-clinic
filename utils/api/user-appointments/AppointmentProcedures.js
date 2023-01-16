import { getUserToken } from "../../auth/user-token"
import { HttpError, ParameterError } from "../../errors"
import backendBaseURL from "../backendBaseURL"

export async function getUserAppointmentProcedure(patientUid, slotSeconds) {
  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setUserAppointmentProcedure(
  patientUid,
  slotSeconds,
  procedureBody
) {
  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")
  if (!procedureBody) throw new ParameterError("procedureBody")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure`
  const response = await fetch(link, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      procedureBody,
    }),
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}
