import { FieldValue, FieldPath, Firestore } from "firebase-admin/firestore"
import {
  getMonthSecondsFromSlotSeconds,
  getUnixTimestampFromMonthAndYear,
} from "../helpers/conversions"

export async function createReservation(
  db: Firestore,
  slotSeconds: string,
  status: string
) {
  const monthSeconds = getMonthSecondsFromSlotSeconds(parseInt(slotSeconds))

  await db
    .collection("monthlyReservations")
    .doc(monthSeconds.toString())
    .set(
      {
        [slotSeconds]: {
          status,
        },
      },
      {
        merge: true,
      }
    )
}

export async function removeReservation(db: Firestore, slotSeconds: string) {
  const monthSeconds = getMonthSecondsFromSlotSeconds(parseInt(slotSeconds))

  await db
    .collection("monthlyReservations")
    .doc(monthSeconds.toString())
    .update({
      [slotSeconds]: FieldValue.delete(),
    })
}

export async function getClosedSlots(
  db: Firestore,
  year: string,
  month: string
) {
  const unixTimestamp = getUnixTimestampFromMonthAndYear(year, month)

  const docSnap = await db
    .collection("monthlyReservations")
    .doc(unixTimestamp.toString())
    .get()

  const dates: unknown[] = []

  if (docSnap.exists) {
    const data = docSnap.data() as any
    Object.keys(data).forEach((timeslot) => {
      if (data[timeslot].status === "closed") dates.push(timeslot)
    })
  }

  return dates
}

export async function getTakenSlots(
  db: Firestore,
  startSeconds: string,
  endSeconds: string
) {
  // We pass seconds to this function, so make sure to
  // transform them into milliseconds.
  const colSnap = await db
    .collection("timeslots")
    .where(FieldPath.documentId(), ">=", startSeconds)
    .where(FieldPath.documentId(), "<", endSeconds)
    .where("status", "==", "taken")
    .get()

  const dates: unknown[] = []

  if (colSnap.empty) return dates

  colSnap.forEach((doc) => {
    dates.push(doc.id)
  })

  return dates
}

export async function getUnavailableSlots(
  db: Firestore,
  year: string,
  month: string
) {
  const unixTimestamp = getUnixTimestampFromMonthAndYear(year, month)

  const docSnap = await db
    .collection("monthlyReservations")
    .doc(unixTimestamp.toString())
    .get()

  const dates: unknown[] = []

  if (docSnap.exists) {
    const data = docSnap.data() as any
    Object.keys(data).forEach((timeslot) => {
      dates.push({
        timeslot,
        status: data[timeslot].status,
      })
    })
  }

  return dates
}
