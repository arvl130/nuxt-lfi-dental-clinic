import { initializeApp, getApps } from "firebase/app"

export default defineNuxtPlugin(() => {
  const {
    public: {
      firebaseApiKey,
      firebaseAuthDomain,
      firebaseProjectId,
      firebaseStorageBucket,
      firebaseMessagingSenderId,
      firebaseAppId,
      firebaseMeasurementId,
    },
  } = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
  }

  // Initialize Firebase
  if (getApps().length === 0) initializeApp(firebaseConfig)
})
