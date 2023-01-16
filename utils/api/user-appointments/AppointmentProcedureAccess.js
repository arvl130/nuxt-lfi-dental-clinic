import { getUserToken } from "../../auth/user-token"
import backendBaseURL from "../backendBaseURL"
import { HttpError, ParameterError } from "../../errors"

export async function cancelRequestProcedureAccess(patientUid, slotSeconds) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure/request-access`
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

export async function requestProcedureAccess(patientUid, slotSeconds) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure/request-access`
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

export async function setProcedureAccessAllowed(patientUid, slotSeconds) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure/access`
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

export async function setProcedureAccessDisallowed(patientUid, slotSeconds) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/procedure/access`
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
