import { getAuth } from "@firebase/auth"
import { defineStore } from "pinia"
import { getDownloadURL } from "~/utils/download-url"

export const useProfilePictureStore = defineStore({
  id: "profilePicture",
  state: () => ({
    profilePictureDownloadURL: null,
    profilePictureURL: null,
    initialized: false,
  }),
  getters: {
    getDownloadURL: (state) => state.profilePictureDownloadURL,
    getURL: (state) => state.profilePictureURL,
    isInitialized: (state) => state.initialized,
  },
  actions: {
    async initialize() {
      const auth = getAuth()
      const profilePictureURL = auth.currentUser.photoURL
      if (profilePictureURL)
        this.profilePictureDownloadURL = await getDownloadURL(profilePictureURL)
      else this.profilePictureDownloadURL = ""
      this.profilePictureURL = profilePictureURL
      this.initialized = true
    },
  },
})
