import { getAuth } from "@firebase/auth"
import { defineStore } from "pinia"

export const useUserFullnameStore = defineStore({
  id: "userFullname",
  state: () => ({
    fullName: null,
    initialized: false,
  }),
  getters: {
    getFullname: (state) => state.fullName,
    isInitialized: (state) => state.initialized,
  },
  actions: {
    async initialize() {
      const auth = getAuth()
      this.fullName = auth.currentUser.displayName
      this.initialized = true
    },
  },
})
