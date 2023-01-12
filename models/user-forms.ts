import { Firestore } from "firebase-admin/firestore"

export async function getConsentForm(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(`${patientUid}/patientRecords/consentForm`)
    .get()

  if (docSnap.exists) return docSnap.data()
  else return {}
}

export async function setConsentForm(
  db: Firestore,
  patientUid: string,
  consentForm: Object
) {
  await db
    .collection("users")
    .doc(`${patientUid}/patientRecords/consentForm`)
    .set(consentForm, {
      merge: true,
    })
}

export async function getAssessmentForm(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(`${patientUid}/patientRecords/assessmentForm`)
    .get()

  if (docSnap.exists) return docSnap.data()
  else return {}
}

export async function setAssessmentForm(
  db: Firestore,
  patientUid: string,
  assessmentForm: Object
) {
  await db
    .collection("users")
    .doc(`${patientUid}/patientRecords/assessmentForm`)
    .set(assessmentForm, {
      merge: true,
    })
}
