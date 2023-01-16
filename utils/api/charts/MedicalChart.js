import { getUserToken } from "../../auth/user-token"
import backendBaseURL from "../../api/backendBaseURL"
import { HttpError, ParameterError } from "../../errors"

export async function getMedicalChart(patientUid) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")

  const link = `${backendBaseURL}/users/${patientUid}/charts/medical-chart`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function updateMedicalChart(
  patientUid,
  personalInformation,
  medicalHistory,
  dentalHistory
) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!personalInformation) throw new ParameterError("personalInformation")
  if (!medicalHistory) throw new ParameterError("medicalHistory")
  if (!dentalHistory) throw new ParameterError("dentalHistory")

  const link = `${backendBaseURL}/users/${patientUid}/charts/medical-chart`
  const response = await fetch(link, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      personalInformation,
      medicalHistory,
      dentalHistory,
    }),
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function isFilledInMedicalChart(patientUid) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")

  const link = `${backendBaseURL}/users/${patientUid}/charts/medical-chart/filled-in`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setFilledInMedicalChart(patientUid) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")

  const link = `${backendBaseURL}/users/${patientUid}/charts/medical-chart/filled-in`
  const response = await fetch(link, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}
