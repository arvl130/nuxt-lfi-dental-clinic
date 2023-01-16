import { getUserToken } from "../../auth/user-token"
import { HttpError, ParameterError } from "../../errors"
import backendBaseURL from "../../api/backendBaseURL"

export async function getConsentForm(patientUid) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")

  const link = `${backendBaseURL}/users/${patientUid}/forms/consent`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setConsentForm(patientUid, consentForm) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!consentForm) throw new ParameterError("consentForm")

  const link = `${backendBaseURL}/users/${patientUid}/forms/consent`
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      dataUrl: consentForm,
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
