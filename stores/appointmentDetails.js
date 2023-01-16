import { defineStore } from "pinia"

export const useAppointmentDetailsStore = defineStore({
  id: "appointmentDetails",
  state: () => ({
    chosenService: null,
    slotSeconds: null,
    isInitialized: false,
  }),
  getters: {
    getService: (state) => state.chosenService,
    getSlotSeconds: (state) => state.slotSeconds,
    getInitStatus: (state) => state.isInitialized,
  },
  actions: {
    setDetails(service, slotSeconds) {
      this.chosenService = service
      this.slotSeconds = slotSeconds
      this.isInitialized = true
    },
  },
})
