<script setup>
import { ref, watchEffect } from "vue"
import {
  getMonthIndex,
  getUnixSecondsFromObject,
} from "~/utils/date-conversions"
import { useScheduleCalendarStore } from "~/stores/scheduleCalendar"

const props = defineProps({
  date: Number,
  month: String,
  year: String,
  hours: String,
  minutes: String,
})

const scheduleCalendar = useScheduleCalendarStore()
const status = ref(null)
const timeInUnixSecs = ref(0)

watchEffect(() => {
  // Determine the unix timestamp for this time slot,
  // based on UTC+8 (Asia/Manila).
  timeInUnixSecs.value = getUnixSecondsFromObject(
    props.date,
    getMonthIndex(props.month) + 1,
    parseInt(props.year),
    parseInt(props.hours),
    parseInt(props.minutes)
  )

  // Assume that we are not in the list of closed slots.
  status.value = null

  // Check each timestamp in the list of closed slots.
  scheduleCalendar.getUnavailableSlots.forEach((unavailableSlot) => {
    // If our timestamp is in the list, color our time slot.
    if (
      unavailableSlot.timeslot === timeInUnixSecs.value.toString() &&
      unavailableSlot.status
    ) {
      status.value = unavailableSlot.status
    }
  })
})

const onClick = async () => {
  // Disable click event if slot is taken.
  if (status.value === "taken") return

  if (status.value === "closed") {
    // Toggle closed date in the database, then synchronize
    // the state with our store.
    await scheduleCalendar.removeClosedSlot(timeInUnixSecs.value.toString())
    status.value = null
  } else {
    await scheduleCalendar.pushClosedSlot(timeInUnixSecs.value.toString())
    status.value = "closed"
  }
}
</script>

<template>
  <div
    class="border border-teal-500 text-center py-1 flex items-center justify-center"
    :class="[
      status === 'closed' ? 'border-gray-600 bg-gray-300' : '',
      status === 'taken' ? 'bg-sky-600 text-white' : '',
    ]"
    @click="onClick()"
  >
    <div>
      <span v-if="hours > 12">{{ hours - 12 }}</span>
      <span v-else>{{ hours }}</span>
      <span>:</span>
      <span v-if="minutes < 10">0{{ minutes }}</span>
      <span v-else>{{ minutes }}</span>

      <span v-if="hours > 12"> pm</span>
      <span v-else> am</span>
    </div>
  </div>
</template>
