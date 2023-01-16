// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    firebaseAdminProjectId: process.env.NUXT_FIREBASE_ADMIN_PROJECT_ID,
    firebaseAdminPrivateKey: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY,
    firebaseAdminClientEmail: process.env.NUXT_FIREBASE_ADMIN_CLIENT_EMAIL,
    gmailAppEmail: process.env.NUXT_GMAIL_APP_EMAIL,
    gmailAppPassword: process.env.NUXT_GMAIL_APP_PASSWORD,
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_MEASUREMENT_ID,
    },
  },
})
