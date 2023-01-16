import { defineStore } from "pinia"
import { getUnavailableSlots } from "~/utils/api/Timeslots"
import {
  getMonthIndex,
  getNumOfDaysInMonth,
  getOffsetFromFirstDayOfMonth,
} from "~/utils/date-conversions"

export const useSetAppointmentCalendarStore = defineStore({
  id: "setAppointmentCalendar",
  state: () => ({
    month: "",
    year: "",
    dayCount: 0,
    offset: 0,
    unavailableSlots: [],
  }),
  getters: {
    getDayCount: (state) => state.dayCount,
    getOffset: (state) => state.offset,
    getUnavailableSlots: (state) => state.unavailableSlots,
  },
  actions: {
    async loadCurrentMonth() {
      const currDate = new Date()

      // Make sure we are getting the current month
      // from UTC+8 (Asia/Manila).
      const monthName = currDate.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        month: "long",
      })

      // Make sure we are getting the current year
      // from UTC+8 (Asia/Manila).
      const year = currDate.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        year: "numeric",
      })

      await this.setMonthAndYear(monthName, year)
    },
    async setMonthAndYear(monthName, year) {
      this.month = monthName
      this.year = year
      this.dayCount = getNumOfDaysInMonth(monthName, year)
      this.offset = getOffsetFromFirstDayOfMonth(monthName, year)

      this.unavailableSlots = await getUnavailableSlots(
        year,
        getMonthIndex(monthName) + 1
      )
    },
  },
})
