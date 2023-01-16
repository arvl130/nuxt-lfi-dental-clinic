import { getAuth } from "@firebase/auth"

export async function getUserToken() {
  const auth = getAuth()
  return await auth.currentUser.getIdToken()
}
