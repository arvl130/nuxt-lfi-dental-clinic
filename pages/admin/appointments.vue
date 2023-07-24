<script setup>
import CalendarWidget from "~/components/admin/CalendarWidget.vue"
import AppointmentsPageCalendarItem from "~/components/admin/AppointmentsPageCalendarItem.vue"
import AppointmentsPageAppointmentItem from "~/components/admin/AppointmentsPageAppointmentItem.vue"
import { useScheduleCalendarStore } from "~/stores/scheduleCalendar"
import { getAllAppointments } from "~/utils/api/user-appointments/Appointments"
import { getMonthIndex, getDate } from "~/utils/date-conversions"
import { DateTime } from "luxon"
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth"

useHead({
  title: "Appointments \u2013 LFI Dental Clinic",
})

definePageMeta({ layout: "admin" })

const selected = reactive({
  month: "",
  year: "",
})
const appointmentsList = ref([])

const { currentUser } = storeToRefs(useAuthStore())
const scheduleCalendar = useScheduleCalendarStore()
const isFinishLoading = ref(false)

watchEffect(async () => {
  if (!currentUser.value) return

  const currDate = new Date()

  // Make sure we are getting the current month
  // from UTC+8 (Asia/Manila).
  selected.month = currDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
  })

  // Make sure we are getting the current year
  // from UTC+8 (Asia/Manila).
  selected.year = currDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
  })

  // Set new month and year in the store,
  // then build the list of calendar items
  // with everything unselected.
  await scheduleCalendar.setMonthAndYear(selected.month, selected.year)
  for (const n of Array(scheduleCalendar.getDayCount).keys()) {
    calendarItems.value.push({
      date: n + 1,
      selected: false,
    })
  }

  // Populate appointments list
  appointmentsList.value = await getAllAppointments(
    selected.year,
    getMonthIndex(selected.month) + 1
  )

  // Make sure setMonthAndYear is finished before we show the page.
  await nextTick()
  isFinishLoading.value = true
})

const onChangeMonthOrYear = async () => {
  // Hide the calendar temporarily.
  isFinishLoading.value = false

  // Set new month in the store.
  await scheduleCalendar.setMonthAndYear(selected.month, selected.year)

  // Reset calendar items, then build
  // a new list of calendar items with all
  // items unselected.
  calendarItems.value = []
  for (const n of Array(scheduleCalendar.getDayCount).keys()) {
    calendarItems.value.push({
      date: n + 1,
      selected: false,
    })
  }

  // Populate appointments list
  appointmentsList.value = []
  appointmentsList.value = await getAllAppointments(
    selected.year,
    getMonthIndex(selected.month) + 1
  )

  // Wait for all request to flush,
  // then show the calendar again.
  await nextTick()
  isFinishLoading.value = true
}

// Create list of calendar items, with click state managed by parent.
const calendarItems = ref([])

const onCalendarItemSelected = (selectedCalendarItem) => {
  // Iterate through the list of calendar items, and mark
  // the selected item as selected = true. Everything else
  // is marked selected = false.
  calendarItems.value = calendarItems.value.map((calendarItem) => ({
    ...calendarItem,
    selected: calendarItem === selectedCalendarItem ? true : false,
  }))
}

const selectedDate = computed(() => {
  const found = calendarItems.value.find(
    (calendarItem) => calendarItem.selected === true
  )
  if (found) return found.date
  return ""
})

// Only show appointments from the selected date.
const appointmentItemsOnSelectedDate = computed(() => {
  const todayDate = getDate(
    parseInt(selected.year),
    getMonthIndex(selected.month) + 1,
    parseInt(selectedDate.value)
  )

  const result = appointmentsList.value.filter((appointmentItem) => {
    const tempDate = new Date(parseInt(appointmentItem.timeslot) * 1000)
    const year = tempDate.toLocaleString("en-us", {
      year: "numeric",
      timeZone: "Asia/Manila",
    })
    const month = tempDate.toLocaleString("en-us", {
      month: "numeric",
      timeZone: "Asia/Manila",
    })
    const day = tempDate.toLocaleString("en-us", {
      day: "numeric",
      timeZone: "Asia/Manila",
    })

    const isoDateStr = DateTime.fromObject({
      year,
      month,
      day,
    }).toISO()
    const currDate = new Date(isoDateStr)

    if (currDate.getTime() === todayDate.getTime()) return true

    return false
  })

  return result
})

const onAppointmentItemAttendedChanged = (attendedStatus, timeslot) => {
  appointmentsList.value = appointmentsList.value.map((appointment) => {
    return {
      ...appointment,
      attended:
        appointment.timeslot === timeslot
          ? attendedStatus
          : appointment.attended,
    }
  })
}
</script>

<template>
  <div class="lg:px-6">
    <h1 class="text-2xl font-semibold mb-1">Appointments</h1>
    <div class="grid sm:flex sm:gap-4 mb-4 sm:mb-2">
      <p class="max-w-prose">
        Select a date to see which appointments have been set. Dates with at
        least one scheduled appointment are marked blue.
      </p>
      <div v-if="isFinishLoading">
        <div class="lg:mb-3">
          <span class="text-gray-300">&#x2B24;</span> Closed
        </div>
        <div class="lg:mb-3">
          <span class="text-sky-700">&#x2B24;</span> Reserved
        </div>
      </div>
    </div>
    <div v-if="isFinishLoading">
      <div class="grid gap-4 lg:grid-cols-[8rem_auto] mx-auto">
        <div>
          <div class="border border-teal-500 px-2 py-1 rounded-full mb-3">
            <select
              class="w-full bg-transparent"
              v-model="selected.month"
              @change="onChangeMonthOrYear()"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
          <div class="border border-teal-500 px-2 py-1 rounded-full">
            <select
              class="w-full bg-transparent"
              v-model="selected.year"
              @change="onChangeMonthOrYear()"
            >
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>
        <div class="max-w-fit">
          <!-- Calendar -->
          <CalendarWidget>
            <div
              class="border border-teal-500 text-right px-2"
              v-for="_ in scheduleCalendar.getOffset"
              :key="_"
            ></div>
            <AppointmentsPageCalendarItem
              class="border border-teal-500 text-right px-2"
              v-for="calendarItem in calendarItems"
              :key="calendarItem.date"
              :year="selected.year"
              :month="selected.month"
              :date="calendarItem.date"
              :isSelected="calendarItem.selected"
              @click="onCalendarItemSelected(calendarItem)"
            />
          </CalendarWidget>
        </div>
      </div>
      <div v-if="selectedDate && appointmentItemsOnSelectedDate.length > 0">
        <div
          class="grid grid-cols-5 gap-4 py-4 px-6 bg-teal-500/40 mt-8 font-semibold text-sky-700"
        >
          <div>Date</div>
          <div>Full name</div>
          <div>Service</div>
          <div>Time</div>
          <div>Attended</div>
        </div>
        <AppointmentsPageAppointmentItem
          v-for="appointment in appointmentItemsOnSelectedDate"
          :key="appointment.timeslot"
          :attended="appointment.attended"
          :timeslot="appointment.timeslot"
          :service="appointment.service"
          :patientUid="appointment.patientUid"
          @attended-changed="onAppointmentItemAttendedChanged"
        />
      </div>
    </div>
    <div class="text-2xl font-bold text-center" v-else>Loading calendar...</div>
  </div>
</template>
