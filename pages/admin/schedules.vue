<script setup>
import CalendarWidget from "~/components/admin/CalendarWidget.vue"
import ScheduleCalendarItem from "~/components/admin/ScheduleCalendarItem.vue"
import { useScheduleCalendarStore } from "~/stores/scheduleCalendar"
import TimeslotsWidget from "~/components/admin/TimeslotsWidget.vue"
import SchedulesPageTimeslotsItem from "~/components/admin/SchedulesPageTimeslotsItem.vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "~~/stores/auth"

useHead({
  title: "Schedules \u2013 LFI Dental Clinic",
})

definePageMeta({ layout: "admin" })

const selected = reactive({
  month: "",
  year: "",
  date: "",
})

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
  selected.date = selectedCalendarItem.date
  calendarItems.value = calendarItems.value.map((calendarItem) => ({
    ...calendarItem,
    selected: calendarItem === selectedCalendarItem ? true : false,
  }))
}
</script>

<template>
  <div class="lg:px-6">
    <div class="mb-4">
      <h1 class="text-2xl font-semibold mb-1">Schedules</h1>
      <p>
        Select a date and click on one of the timeslots to close or open them.
      </p>
    </div>
    <div
      class="grid justify-center xl:grid-cols-[auto_1fr] gap-4 mx-auto"
      v-if="isFinishLoading"
    >
      <div>
        <div class="sm:flex sm:gap-4 sm:h-14">
          <div class="mb-3 sm:hidden">
            <div class="lg:mb-3">
              <span class="text-gray-300">&#x2B24;</span> Closed
            </div>
            <div class="lg:mb-3">
              <span class="text-sky-700">&#x2B24;</span> Reserved
            </div>
          </div>
          <!-- Month -->
          <div class="h-fit border border-teal-600 px-4 py-2 rounded-full mb-3">
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
          <!-- Year -->
          <div class="h-fit border border-teal-600 px-4 py-2 rounded-full mb-3">
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
          <div class="hidden sm:grid ml-auto sm:grid-cols-2 items-center pr-4">
            <div class="sm:mb-3">
              <span class="text-gray-300">&#x2B24;</span> Closed
            </div>
            <div class="sm:mb-3">
              <span class="text-sky-700">&#x2B24;</span> Reserved
            </div>
          </div>
        </div>
        <!-- Calendar -->
        <CalendarWidget>
          <div
            class="border border-teal-500 text-right px-2"
            v-for="_ in scheduleCalendar.getOffset"
            :key="_"
          ></div>
          <ScheduleCalendarItem
            class="border border-teal-500 text-right px-2"
            v-for="calendarItem in calendarItems"
            :key="calendarItem.date"
            :date="calendarItem.date"
            :isSelected="calendarItem.selected"
            @click="onCalendarItemSelected(calendarItem)"
          />
        </CalendarWidget>
      </div>
      <div class="pt-14">
        <TimeslotsWidget v-if="selected.date !== ''">
          <template #morning-slots>
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="8"
              minutes="0"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="9"
              minutes="0"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="10"
              minutes="0"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="11"
              minutes="0"
            />
          </template>
          <template #afternoon-slots>
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="13"
              minutes="30"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="15"
              minutes="0"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="16"
              minutes="30"
            />
            <SchedulesPageTimeslotsItem
              :date="selected.date"
              :month="selected.month"
              :year="selected.year"
              hours="18"
              minutes="0"
            />
          </template>
        </TimeslotsWidget>
      </div>
    </div>
    <div class="text-2xl font-bold text-center" v-else>Loading calendar...</div>
  </div>
</template>
