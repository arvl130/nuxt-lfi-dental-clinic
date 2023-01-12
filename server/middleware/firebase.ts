import { initializeApp, cert, getApps, getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  })

  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = "No Content."
    return "OK"
  }

  const {
    FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_PRIVATE_KEY,
    FIREBASE_ADMIN_CLIENT_EMAIL,
  } = process.env

  if (!FIREBASE_ADMIN_PROJECT_ID)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: "Missing or invalid Firebase Admin project ID",
    })

  if (!FIREBASE_ADMIN_PRIVATE_KEY)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: "Missing or invalid Firebase Admin private key",
    })

  if (!FIREBASE_ADMIN_CLIENT_EMAIL)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: "Missing or invalid Firebase Admin client email",
    })

  try {
    const app =
      getApps().length === 0
        ? initializeApp({
            credential: cert({
              projectId: FIREBASE_ADMIN_PROJECT_ID,
              privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
              clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
            }),
          })
        : getApp()

    const auth = getAuth(app)
    const db = getFirestore(app)

    event.context.firebase = {
      auth,
      db,
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: "Could not initialize Firebase",
    })
  }

  try {
    const { authorization } = getHeaders(event)
    if (authorization) {
      const idToken = authorization.split(" ")[1]
      const { accountType, uid } =
        await event.context.firebase.auth.verifyIdToken(idToken)

      if (
        typeof accountType === "string" &&
        (accountType === "patient" || accountType === "admin")
      )
        event.context.user = {
          id: uid,
          accountType,
        }
    }
  } catch (e) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unathorized",
      message: "Invalid authorization ID token",
    })
  }
})
