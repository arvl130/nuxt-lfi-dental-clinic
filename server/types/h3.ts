import { Auth } from "firebase-admin/auth"

declare module "h3" {
  interface H3EventContext extends Record<string, any> {
    firebase: {
      db: FirebaseFirestore.Firestore
      auth: Auth
    }
    user?: {
      id: string
      accountType: "patient" | "admin"
    }
  }
}
