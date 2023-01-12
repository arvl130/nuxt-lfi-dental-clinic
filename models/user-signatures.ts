import { Firestore } from "firebase-admin/firestore"

export async function getPatientSignature(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("patientSignature")
    .get()

  if (docSnap.exists) {
    const data = docSnap.data()
    if (data && data.dataUrl) return data.dataUrl
    else return ""
  }
  return ""
}

export async function setPatientSignature(
  db: Firestore,
  patientUid: string,
  dataUrl: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("patientSignature")
    .set({
      dataUrl,
    })
}

export async function getGuardianSignature(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("guardianSignature")
    .get()

  if (docSnap.exists) {
    const data = docSnap.data()
    if (data && data.dataUrl) return data.dataUrl
    else return ""
  }
  return ""
}

export async function setGuardianSignature(
  db: Firestore,
  patientUid: string,
  dataUrl: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("guardianSignature")
    .set({
      dataUrl,
    })
}
