import { Firestore } from "firebase-admin/firestore"

export async function getAppointmentProcedure(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .get()

  if (!docSnap.exists)
    throw createError({
      message: "No such appointment",
      statusCode: 400,
    })

  const data = docSnap.data()

  // We've already accounted for the document not existing above,
  // so we can assert its existence here.
  return {
    uid: docSnap.id,
    procedure: data!.procedure,
    procedureVisible: data!.procedureVisible,
  }
}

export async function getAllAppointments(db: Firestore, patientUid: string) {
  const colSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .get()

  const appointments: unknown[] = []

  if (colSnap.empty) return appointments

  colSnap.forEach((doc) => {
    appointments.push({
      uid: doc.id,
      ...doc.data(),
    })
  })

  return appointments
}

export async function setAppointmentAttended(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        attended: true,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentNotAttended(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        attended: false,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentPending(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        attended: "pending",
        price: 0,
        amountPaid: 0,
        status: null,
        procedure: "",
        procedureVisible: false,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentProcedure(
  db: Firestore,
  patientUid: string,
  slotSeconds: string,
  procedureBody: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        procedure: procedureBody,
      },
      {
        merge: true,
      }
    )
}

export async function requestProcedureAccess(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        procedureVisible: "requesting",
      },
      {
        merge: true,
      }
    )
}

export async function cancelRequestProcedureAccess(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        procedureVisible: false,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentProcedureAccessAllowed(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        procedureVisible: true,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentProcedureAccessDisallowed(
  db: Firestore,
  patientUid: string,
  slotSeconds: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        procedureVisible: false,
      },
      {
        merge: true,
      }
    )
}

export async function setAppointmentPayment(
  db: Firestore,
  patientUid: string,
  slotSeconds: string,
  price: number,
  amountPaid: number,
  status: string | null
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("appointments")
    .doc(slotSeconds)
    .set(
      {
        price,
        amountPaid,
        status,
      },
      {
        merge: true,
      }
    )
}
