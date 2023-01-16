<script setup>
import { onMounted, ref } from "vue"
import { getDateOfTimeslot } from "~/utils/date-conversions"
import { useScheduleCalendarStore } from "~/stores/scheduleCalendar"
const scheduleCalendar = useScheduleCalendarStore()

const props = defineProps({
  date: Number,
  isSelected: Boolean,
})

const isColored = ref(false)

// Color our item when it is displayed, if applicable.
onMounted(() => {
  // Check if our date is in the list of closed slots.
  scheduleCalendar.getUnavailableSlots.forEach((unavailableSlot) => {
    // If it is, add fill color to our item.
    if (
      getDateOfTimeslot(unavailableSlot.timeslot) === props.date &&
      unavailableSlot.status === "closed"
    )
      isColored.value = true
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
    if (date === props.date && unavailableSlot.status === "closed") {
      isColored.value = true
    }
  })
})
</script>

<template>
  <div
    class="border border-teal-500 text-right px-2"
    :class="[
      isColored ? 'border-gray-600 bg-gray-300' : '',
      isSelected ? 'bg-teal-500/50' : '',
    ]"
  >
    {{ date }}
  </div>
</template>
