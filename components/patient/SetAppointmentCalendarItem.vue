<script setup>
import { computed, ref, watchEffect } from "vue"
import { DateTime } from "luxon"
import {
  getMonthIndex,
  getDateTomorrow,
  getDateSixMonthsFromNow,
} from "~/utils/date-conversions"
import { getTimeslots } from "~/utils/api/Timeslots"

const props = defineProps({
  date: Number,
  month: String,
  year: String,
  isSelected: Boolean,
  closedSlotCount: Number,
  takenSlotCount: Number,
})

const isEntireDayClosed = ref(false)

const reservableSlotCount = computed(() => {
  if (!props.closedSlotCount) return 0

  return getTimeslots().length - props.closedSlotCount
})
const availableSlotCount = computed(() => {
  if (!props.closedSlotCount) return 0

  return reservableSlotCount.value - props.takenSlotCount
})
const isSlotFull = ref(false)

watchEffect(() => {
  isEntireDayClosed.value = false
  isSlotFull.value = false

  const month = getMonthIndex(props.month) + 1
  const isoDateStrCurrent = DateTime.fromObject(
    {
      year: parseInt(props.year),
      month,
      day: props.date,
    },
    {
      timezone: "Asia/Manila",
    }
  ).toISO()
  const dateCurrent = new Date(isoDateStrCurrent)
  const dateTomorrow = getDateTomorrow()
  if (dateCurrent.getTime() < dateTomorrow.getTime()) {
    isEntireDayClosed.value = true
    return
  }

  if (props.closedSlotCount === getTimeslots().length) {
    isEntireDayClosed.value = true
    return
  }

  const dateSixMonthsFromNow = getDateSixMonthsFromNow()
  if (dateCurrent.getTime() > dateSixMonthsFromNow.getTime()) {
    isEntireDayClosed.value = true
    return
  }

  if (reservableSlotCount.value > 0 && availableSlotCount.value === 0)
    isSlotFull.value = true
})
</script>

<template>
  <div
    class="border border-teal-500 text-right px-3 py-1"
    :class="{
      'bg-teal-500/50': isSelected,
      'bg-gray-300': isEntireDayClosed && !isSelected,
      'border-gray-600': isEntireDayClosed && !isSelected,
      'bg-sky-600': isSlotFull,
      'text-white': isSlotFull,
    }"
  >
    {{ date }}
  </div>
</template>
