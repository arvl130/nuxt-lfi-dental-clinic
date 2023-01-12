import { Firestore } from "firebase-admin/firestore"

export async function getDeciduousChart(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("deciduousChart")
    .get()

  if (docSnap.exists) {
    const data = docSnap.data()
    if (data) return data.dataUrl
    else return ""
  } else return ""
}

export async function setDeciduousChart(
  db: Firestore,
  patientUid: string,
  dataUrl: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("deciduousChart")
    .set({
      dataUrl,
    })
}

export async function getDentalChart(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("dentalChart")
    .get()

  if (docSnap.exists) {
    const data = docSnap.data()
    if (data) return data.dataUrl
    else return ""
  } else return ""
}

export async function setDentalChart(
  db: Firestore,
  patientUid: string,
  dataUrl: string
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("dentalChart")
    .set({
      dataUrl,
    })
}

export async function getMedicalChart(db: Firestore, patientUid: string) {
  const docSnap = await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("medicalChart")
    .get()

  if (docSnap.exists) return docSnap.data()
  else
    return {
      personalInformation: {
        fullName: "",
        gender: "",
        birthDate: "",
        maritalStatus: "",
        mobileNo: "",
        telephoneNo: "",
      },
      medicalHistory: {
        heartAilmentDisease: "",
        hospitalAdmission: "",
        selfMedication: "",
        allergies: "",
        operation: "",
        tumors: "",
        diabetes: false,
        sinusitis: false,
        bleedingGums: false,
        hypertension: false,
        stomachDisease: false,
        bloodDisease: false,
        headache: false,
        liverDisease: false,
        cold: false,
        kidneyDisease: false,
        pregnant: "",
        familyHistory: "",
      },
      dentalHistory: {
        bleedingInMouth: false,
        gumsChangeColor: false,
        sensitiveTeeth: false,
        badBreath: false,
        palate: false,
        teethChangeColor: false,
        lumpsInMouth: false,
        clickingSoundInMouth: false,
        pastDentalCare: "",
      },
    }
}

export async function setMedicalChart(
  db: Firestore,
  patientUid: string,
  personalInformation: Object,
  medicalHistory: Object,
  dentalHistory: Object
) {
  await db
    .collection("users")
    .doc(patientUid)
    .collection("patientRecords")
    .doc("medicalChart")
    .set({
      personalInformation,
      medicalHistory,
      dentalHistory,
    })
}

export async function isFilledInMedicalChart(
  db: Firestore,
  patientUid: string
) {
  const docSnap = await db.collection("users").doc(patientUid).get()

  if (docSnap.exists) {
    const data = docSnap.data()

    if (data?.filledInMedicalChart) return true
    else return false
  } else return false
}

export async function setFilledInMedicalChart(
  db: Firestore,
  patientUid: string
) {
  await db.collection("users").doc(patientUid).set(
    {
      filledInMedicalChart: true,
    },
    {
      merge: true,
    }
  )
}
