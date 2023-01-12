import { Firestore, FieldValue } from "firebase-admin/firestore"

export async function removeMessage(db: Firestore, uid: string) {
  const doc = await db.collection("messages").doc(uid).get()

  if (!doc.exists)
    throw createError({
      message: "No such message",
      statusCode: 404,
    })

  await db.collection("messages").doc(uid).delete()

  return {
    uid: doc.id,
    ...doc.data(),
  }
}

export async function getAllMessages(db: Firestore) {
  const snapshot = await db
    .collection("messages")
    .orderBy("createdAt", "desc")
    .get()

  const messages: unknown[] = []

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      messages.push({
        uid: doc.id,
        ...doc.data(),
      })
    })
  }

  return messages
}

export async function createMessage(
  db: Firestore,
  email: string,
  body: string,
  senderName: string
) {
  const doc = await db.collection("messages").add({
    email,
    body,
    senderName,
    isArchived: false,
    createdAt: FieldValue.serverTimestamp(),
  })

  const docSnap = await doc.get()
  if (!docSnap.exists)
    throw createError({
      message: "Could not retrieve created message",
      statusCode: 500,
    })

  return {
    uid: doc.id,
    ...docSnap.data(),
  }
}

export async function toggleMessageArchiveStatus(db: Firestore, uid: string) {
  const docSnap = await db.collection("messages").doc(uid).get()

  if (!docSnap.exists) {
    throw createError({
      message: "No such message",
      statusCode: 404,
    })
  }

  const { isArchived } = docSnap.data() as any

  await db.collection("messages").doc(uid).set(
    {
      isArchived: !isArchived,
    },
    {
      merge: true,
    }
  )

  return {
    newStatus: isArchived ? "archived" : "unarchived",
  }
}
