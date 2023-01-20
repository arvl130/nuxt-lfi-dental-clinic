import { FieldValue, Firestore } from "firebase-admin/firestore"
import { Auth } from "firebase-admin/auth"
import {
  getMonthSecondsFromSlotSeconds,
  getUnixTimestampFromMonthAndYear,
} from "~/utils/date-conversions"
import { sendEmail } from "~/utils/mail"

export async function cancelAppointment(
  db: Firestore,
  auth: Auth,
  patientUid: string,
  slotSeconds: string
) {
  const monthSeconds = getMonthSecondsFromSlotSeconds(parseInt(slotSeconds))
  const userAppointmentRef = db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds.toString())

  const reservationRef = db
    .collection("monthlyReservations")
    .doc(monthSeconds.toString())

  const userAppointmentSnapshot = await userAppointmentRef.get()
  if (!userAppointmentSnapshot.exists)
    throw createError({
      message: "No such appointment",
      statusCode: 400,
    })

  const reservationSnapshot = await reservationRef.get()
  if (!reservationSnapshot.exists)
    throw createError({
      message: "No such reservation",
      statusCode: 400,
    })

  const reservationData = reservationSnapshot.data()
  if (!reservationData?.hasOwnProperty(slotSeconds.toString()))
    throw createError({
      message: "No such reservation",
      statusCode: 400,
    })

  const userRecord = await auth.getUser(patientUid)
  const patientName = userRecord.displayName
  const email = userRecord.email

  if (!patientName)
    throw createError({
      message: "No patient name for this user",
      statusCode: 400,
    })

  if (!email)
    throw createError({
      message: "No patient name for this user",
      statusCode: 400,
    })

  const batch = db.batch()
  batch.delete(userAppointmentRef)

  batch.update(reservationRef, {
    [slotSeconds]: FieldValue.delete(),
  })

  await batch.commit()

  const formattedDate = new Date(parseInt(slotSeconds) * 1000).toLocaleString(
    "en-us",
    {
      timeZone: "Asia/Manila",
      month: "long",
      year: "numeric",
      day: "numeric",
    }
  )
  const hours = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[1]
    .split(":")[0]
  const minutes = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[1]
    .split(":")[1]
  const ampm = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[2]
  await sendEmail(
    email,
    "LFI Dental Clinic - Your appointment has been cancelled",
    `
Dear ${patientName},

The following appointment you have set has been cancelled:
Date and time: ${formattedDate} ${hours}:${minutes} ${ampm}
Service: ${userAppointmentSnapshot.data()?.service ?? "N/A"}

This is a system-generated email notification. Replies to this message are not monitored or answered.
  `
  )
}

export async function createAppointment(
  db: Firestore,
  auth: Auth,
  patientUid: string,
  slotSeconds: string,
  service: string
) {
  const monthSeconds = getMonthSecondsFromSlotSeconds(parseInt(slotSeconds))
  const batch = db.batch()
  const userAppointmentsRef = db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds.toString())

  const reservationsRef = db
    .collection("monthlyReservations")
    .doc(monthSeconds.toString())

  const userRecord = await auth.getUser(patientUid)
  const patientName = userRecord.displayName
  const email = userRecord.email

  if (!patientName)
    throw createError({
      message: "No patient name for this user",
      statusCode: 400,
    })

  if (!email)
    throw createError({
      message: "No patient name for this user",
      statusCode: 400,
    })

  batch.set(userAppointmentsRef, {
    createdAt: FieldValue.serverTimestamp(),
    timeslot: slotSeconds.toString(),
    service,
    procedure: "",
    price: 0,
    amountPaid: 0,
    status: null,
    month: monthSeconds,
    patientUid,
    attended: "pending",
    procedureVisible: false,
  })

  batch.update(reservationsRef, {
    [slotSeconds]: {
      status: "taken",
    },
  })

  await batch.commit()

  const formattedDate = new Date(parseInt(slotSeconds) * 1000).toLocaleString(
    "en-us",
    {
      timeZone: "Asia/Manila",
      month: "long",
      year: "numeric",
      day: "numeric",
    }
  )
  const hours = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[1]
    .split(":")[0]
  const minutes = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[1]
    .split(":")[1]
  const ampm = new Date(parseInt(slotSeconds) * 1000)
    .toLocaleString("en-us", {
      timeZone: "Asia/Manila",
    })
    .split(" ")[2]
  await sendEmail(
    email,
    "LFI Dental Clinic - You have been reserved an appointment",
    `
Dear ${patientName},

The following appointment has been reserved for you:
Date and time: ${formattedDate} ${hours}:${minutes} ${ampm}
Service: ${service}

This is a system-generated email notification. Replies to this message are not monitored or answered.
  `
  )
}

export async function getAllAppointments(
  db: Firestore,
  year: string,
  month: string
) {
  const unixTimestamp = getUnixTimestampFromMonthAndYear(year, month)

  const colSnap = await db
    .collectionGroup("appointments")
    .where("month", "==", unixTimestamp)
    .get()

  const appointments: unknown[] = []

  if (!colSnap.empty) {
    colSnap.forEach((doc) => {
      appointments.push({
        timeslot: doc.id,
        ...doc.data(),
      })
    })
  }

  return appointments
}

export async function silentlyDeleteAppointment(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  const monthSeconds = getMonthSecondsFromSlotSeconds(parseInt(slotSeconds))
  const userAppointmentRef = db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds.toString())

  const reservationRef = db
    .collection("monthlyReservations")
    .doc(monthSeconds.toString())

  const userAppointmentSnapshot = await userAppointmentRef.get()
  if (!userAppointmentSnapshot.exists)
    throw createError({
      message: "No such appointment",
      statusCode: 400,
    })

  const reservationSnapshot = await reservationRef.get()
  if (!reservationSnapshot.exists)
    throw createError({
      message: "No such reservation",
      statusCode: 400,
    })

  const reservationData = reservationSnapshot.data()
  if (!reservationData?.hasOwnProperty(slotSeconds.toString()))
    throw createError({
      message: "No such reservation",
      statusCode: 400,
    })

  const batch = db.batch()
  batch.delete(userAppointmentRef)

  batch.update(reservationRef, {
    [slotSeconds]: FieldValue.delete(),
  })

  await batch.commit()
}

export async function getRequestingProcedureAccess(db: Firestore) {
  const colSnap = await db
    .collectionGroup("appointments")
    .where("procedureVisible", "==", "requesting")
    .get()

  const appointments: unknown[] = []

  if (!colSnap.empty) {
    colSnap.forEach((doc) => {
      appointments.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return appointments
}
