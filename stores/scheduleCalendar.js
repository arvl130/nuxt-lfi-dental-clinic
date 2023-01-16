import { defineStore } from "pinia"
import {
  addClosedSlot,
  deleteClosedSlot,
  getUnavailableSlots,
} from "~/utils/api/Timeslots"
import {
  getMonthIndex,
  getNumOfDaysInMonth,
  getOffsetFromFirstDayOfMonth,
} from "~/utils/date-conversions"

export const useScheduleCalendarStore = defineStore({
  id: "scheduleCalendar",
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
    async pushClosedSlot(timeslot) {
      if (this.month === "" && this.year === "") {
        return
      }

      this.unavailableSlots.push({ timeslot, status: "closed" })
      await addClosedSlot(timeslot)
      console.log("added:", timeslot)
    },
    async removeClosedSlot(timeslot) {
      if (this.month === "" && this.year === "") {
        return
      }

      this.unavailableSlots = this.unavailableSlots.filter(
        (unavailableSlot) => {
          if (unavailableSlot.timeslot !== timeslot) return true
          return false
        }
      )
      await deleteClosedSlot(timeslot)
      console.log("removed:", timeslot)
    },
  },
})
