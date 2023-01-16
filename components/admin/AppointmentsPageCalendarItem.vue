<script setup>
import { onMounted, ref } from "vue"
import {
  getDateOfTimeslot,
  getDate,
  getMonthIndex,
  getDateToday,
} from "~/utils/date-conversions"
import { useScheduleCalendarStore } from "~/stores/scheduleCalendar"
const scheduleCalendar = useScheduleCalendarStore()

const props = defineProps({
  year: String,
  month: String,
  date: Number,
  isSelected: Boolean,
})

const isColored = ref(false)
const isInThePast = ref(false)

onMounted(() => {
  // Determine if item is in the past.

  const dateToday = getDateToday()
  const dateCurrent = getDate(
    parseInt(props.year),
    getMonthIndex(props.month) + 1,
    props.date
  )
  if (dateToday.getTime() > dateCurrent.getTime()) isInThePast.value = true

  // Check if our date is in the list of closed slots.
  scheduleCalendar.getUnavailableSlots.forEach((unavailableSlot) => {
    // If it is, add fill color to our item.
    if (
      getDateOfTimeslot(unavailableSlot.timeslot) === props.date &&
      unavailableSlot.status === "taken"
    ) {
      isColored.value = true
      return
    }
  })
})

// Listen for changes to the closed slots in the store.
// If our item, is added to list of closed slots, this
// will add color to our item.
scheduleCalendar.$subscribe((mutation, state) => {
  // Reset colored state value.
  isColored.value = false

  // Check if our state is ni the list of closed slots.
  state.unavailableSlots.forEach((unavailableSlot) => {
    const date = new Date(parseInt(unavailableSlot.timeslot) * 1000).getDate()
    // If it is, add fill color to our item.
    if (date === props.date && unavailableSlot.status === "taken") {
      isColored.value = true
      return
    }
  })
})
</script>

<template>
  <div
    class="border border-teal-500 text-right px-2"
    :class="{
      'border-gray-600': isInThePast,
      'bg-gray-300': isInThePast && !isSelected,
      'border-sky-600': isColored,
      'bg-sky-600': isColored && !isSelected,
      'text-white': isColored && !isSelected,
      'bg-teal-500/50': isSelected,
    }"
  >
    {{ date }}
    <!--
    'border-gray-600': isInThePast && !isSelected,
    'border-gray-600': isInThePast && isSelected,
    'bg-gray-300': isInThePast && !isSelected,
    'border-sky-600': isColored && isSelected,
    'bg-sky-600': isColored && !isSelected,
    'text-white': isColored && !isSelected,
    'bg-teal-500/50': isSelected,
    -->
  </div>
</template>
