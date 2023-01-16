import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useAuthStore } from "~/stores/auth"

export function useCurrentUser() {
  const { currentUser: currentUserFromStore } = useAuthStore()

  const isLoading = ref(true)
  const isAuthenticated = ref(false)
  const currentUser = ref<User | null>(null)

  return {
    isLoading,
    isAuthenticated,
    currentUser,
  }
}
