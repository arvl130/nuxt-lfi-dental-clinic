import { Firestore } from "firebase-admin/firestore"
import { Auth } from "firebase-admin/auth"

export async function createAdminUser(
  db: Firestore,
  auth: Auth,
  email: string,
  password: string
) {
  const userRecord = await auth.createUser({
    displayName: "Admin User",
    email,
    password,
  })

  const uid = userRecord.uid

  await auth.setCustomUserClaims(uid, {
    accountType: "admin",
  })

  await db.collection("users").doc(uid).set({
    accountType: "admin",
    displayName: "Admin User",
    email,
  })

  const docSnap = await db.collection("users").doc(uid).get()

  if (!docSnap.exists)
    throw createError({
      message: "Could not retrieve created user",
      statusCode: 500,
    })

  return {
    uid,
    ...docSnap.data(),
  }
}

export async function createPatientUser(
  db: Firestore,
  auth: Auth,
  email: string,
  password: string,
  fullName: string
) {
  try {
    const userRecord = await auth.createUser({
      displayName: fullName,
      email,
      password,
    })
    const uid = userRecord.uid

    await auth.setCustomUserClaims(uid, {
      accountType: "patient",
    })

    await db.collection("users").doc(uid).set({
      accountType: "patient",
      displayName: fullName,
      email,
      filledInMedicalChart: false,
      isArchived: false,
    })

    const docSnap = await db.collection("users").doc(uid).get()

    if (!docSnap.exists)
      throw createError({
        message: "Could not retrieve created user",
        statusCode: 500,
      })

    return {
      uid,
      ...docSnap.data(),
    }
  } catch (e: any) {
    switch (e.code) {
      case "auth/email-already-exists":
        throw createError({
          message: "Email already exists",
          statusCode: 400,
        })
    }
  }
}

export async function getFirstNUsers(
  db: Firestore,
  auth: Auth,
  numberOfUsers: number,
  startAt = null
) {
  const usersList: unknown[] = []

  const usersSnapshot =
    startAt !== null
      ? await db
          .collection("users")
          .where("accountType", "==", "patient")
          .orderBy("displayName")
          .startAt(await db.collection("users").doc(startAt).get())
          .limit(numberOfUsers)
          .get()
      : await db
          .collection("users")
          .where("accountType", "==", "patient")
          .orderBy("displayName")
          .limit(numberOfUsers)
          .get()

  if (usersSnapshot.empty) return usersList

  usersSnapshot.forEach((docSnap) => {
    const uid = docSnap.id

    // Push promises (instead of results) inside the array,
    // because return statements don't wait for async ForEach
    // functions to finish before returning.
    usersList.push(auth.getUser(uid))
  })

  return await Promise.all(usersList)
}

async function fetchUsers(auth: Auth, nextPageToken?: string) {
  const usersListResult = await auth.listUsers(1000, nextPageToken)
  usersListResult.users.forEach((userRecord) => {
    if (usersList) usersList.push(userRecord.toJSON())
  })

  if (usersListResult.pageToken) {
    await fetchUsers(auth, usersListResult.pageToken)
  }
}

let usersList: undefined | unknown[]

export async function getAllUsers(auth: Auth) {
  usersList = []
  await fetchUsers(auth)
  return usersList
}

export async function getUser(auth: Auth, patientUid: string) {
  return await auth.getUser(patientUid)
}

export async function getAnyNUsers(db: Firestore, numberOfUsers: number) {
  const usersList: unknown[] = []
  const usersRef = db
    .collection("users")
    .where("accountType", "==", "patient")
    .where("isArchived", "==", false)
    .limit(numberOfUsers)

  const usersSnapshot = await usersRef.get()
  if (!usersSnapshot.empty) {
    usersSnapshot.forEach((doc) => {
      usersList.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return usersList
}

export async function getArchivedAnyNUsers(
  db: Firestore,
  numberOfUsers: number
) {
  const usersList: unknown[] = []
  const usersRef = db
    .collection("users")
    .where("accountType", "==", "patient")
    .where("isArchived", "==", true)
    .limit(numberOfUsers)

  const usersSnapshot = await usersRef.get()
  if (!usersSnapshot.empty) {
    usersSnapshot.forEach((doc) => {
      usersList.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return usersList
}

export async function getUsersByName(db: Firestore, nameFilter: string) {
  const usersList: Array<any> = []
  const usersRef = db
    .collection("users")
    .where("accountType", "==", "patient")
    .where("isArchived", "==", false)

  const usersSnapshot = await usersRef.get()
  if (!usersSnapshot.empty) {
    usersSnapshot.forEach((doc) => {
      usersList.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return usersList.filter(({ displayName }) =>
    displayName.toLowerCase().includes(nameFilter)
  )
}

export async function getArchivedUsersByName(
  db: Firestore,
  nameFilter: string
) {
  const usersList: Array<any> = []
  const usersRef = await db
    .collection("users")
    .where("accountType", "==", "patient")
    .where("isArchived", "==", true)

  const usersSnapshot = await usersRef.get()
  if (!usersSnapshot.empty) {
    usersSnapshot.forEach((doc) => {
      usersList.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return usersList.filter(({ displayName }) =>
    displayName.toLowerCase().includes(nameFilter)
  )
}

export async function setUserArchived(db: Firestore, patientUid: string) {
  await db.collection("users").doc(`${patientUid}`).set(
    {
      isArchived: true,
    },
    {
      merge: true,
    }
  )
}

export async function setUserNotArchived(db: Firestore, patientUid: string) {
  await db.collection("users").doc(`${patientUid}`).set(
    {
      isArchived: false,
    },
    {
      merge: true,
    }
  )
}

export async function updateFullName(
  db: Firestore,
  auth: Auth,
  uid: string,
  fullName: string,
  accountType?: string
) {
  // Update name in Firebase Auth.
  await auth.updateUser(uid, {
    displayName: fullName,
  })

  // Update name in root user collection.
  db.collection("users").doc(uid).set(
    {
      displayName: fullName,
    },
    {
      merge: true,
    }
  )

  // Update name in medical chart.
  if (accountType === "patient") {
    await db
      .collection("users")
      .doc(uid)
      .collection("patientRecords")
      .doc("medicalChart")
      .set(
        {
          personalInformation: {
            fullName,
          },
        },
        {
          merge: true,
        }
      )
  }
}
