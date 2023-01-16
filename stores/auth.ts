import { User } from "@firebase/auth"
import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    currentUser: null as User | null,
    isAuthenticated: false as boolean,
    isLoading: true as boolean,
  }),
  getters: {
    getUser: (state) => state.currentUser,
  },
  actions: {
    setUser(currentUser: User | null) {
      this.currentUser = currentUser

      if (currentUser) this.isAuthenticated = true
      else this.isAuthenticated = false

      this.isLoading = false
    },
  },
})
