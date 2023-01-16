import { getUserToken } from "../../auth/user-token"
import { HttpError, ParameterError } from "../../errors"
import backendBaseURL from "../backendBaseURL"

export async function cancelAppointment(patientUid, slotSeconds) {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/cancel`
  const response = await fetch(link, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function getAllAppointments(year, month) {
  if (!year) throw new ParameterError("year")
  if (!month) throw new ParameterError("month")

  const link = `${backendBaseURL}/appointments/${year}/${month}`
  const response = await fetch(link)
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function getAppointmentsRequestingProcedureAccess() {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/appointments/requesting-procedure-access`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function getUserAppointments(patientUid) {
  if (!patientUid) throw new ParameterError("patientUid")

  const idToken = await getUserToken()
  const link = `${backendBaseURL}/users/${patientUid}/appointments`
  const response = await fetch(link, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
  return data.payload
}

export async function newAppointment(patientUid, slotSeconds, service) {
  const idToken = await getUserToken()

  const link = `${backendBaseURL}/timeslots/appointments`
  const response = await fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      patientUid,
      slotSeconds,
      service,
    }),
  })
  const data = await response.json()

  if (!response.ok) throw new HttpError(response.status, data.message)
}

export async function setAppointmentPayment(
  patientUid,
  slotSeconds,
  price,
  amountPaid,
  status
) {
  const idToken = await getUserToken()

  if (!patientUid) throw new ParameterError("patientUid")
  if (!slotSeconds) throw new ParameterError("slotSeconds")
  if (!isFinite(price) || isNaN(price)) throw new ParameterError("price")
  if (!isFinite(amountPaid) || isNaN(amountPaid))
    throw new ParameterError("amountPaid")
  if (status === undefined) throw new ParameterError("status")

  const link = `${backendBaseURL}/users/${patientUid}/appointments/${slotSeconds}/payment`
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify({
      price,
      amountPaid,
      status: status,
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
