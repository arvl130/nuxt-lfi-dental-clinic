import { getUserToken } from "../../auth/user-token"
import { HttpError, ParameterError } from "../../errors"
import backendBaseURL from "../../api/backendBaseURL"

export async function getAssessmentForm(patientUid) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")

  const link = `${backendBaseURL}/users/${patientUid}/forms/assessment`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function setAssessmentForm(patientUid, assessmentForm) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!assessmentForm) throw new ParameterError("assessmentForm")

  const link = `${backendBaseURL}/users/${patientUid}/forms/assessment`
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      dataUrl: assessmentForm,
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
