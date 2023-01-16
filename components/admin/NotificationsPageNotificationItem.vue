<script setup>
import {
  getMonthDayYearOfTimeslot,
  getHoursMinutesOfTimeslot,
} from "~/utils/date-conversions"
import { onMounted, ref } from "vue"
import { getUserProfile } from "~/utils/api/UserProfiles"
import {
  setProcedureAccessAllowed,
  setProcedureAccessDisallowed,
} from "~/utils/api/user-appointments/AppointmentProcedureAccess"

const props = defineProps({
  appointment: Object,
})

const emit = defineEmits(["reload"])

const patientName = ref(null)

onMounted(async () => {
  patientName.value = await getUserProfile(props.appointment.patientUid)
})

const onAllowAccess = async () => {
  await setProcedureAccessAllowed(
    props.appointment.patientUid,
    props.appointment.uid
  )
  emit("reload")
}

const onDisallowAccess = async () => {
  await setProcedureAccessDisallowed(
    props.appointment.patientUid,
    props.appointment.uid
  )
  emit("reload")
}
</script>

<template>
  <div class="grid grid-cols-5 px-6 border-b border-teal-500 gap-4 py-3">
    <div class="overflow-hidden text-ellipsis">
      {{ getMonthDayYearOfTimeslot(appointment.uid) }}
      {{ getHoursMinutesOfTimeslot(appointment.uid) }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      <span v-if="patientName">
        {{ patientName.userRecord.displayName }}
      </span>
      <span class="italic" v-else>loading ...</span>
    </div>
    <div class="overflow-hidden text-ellipsis">
      {{ appointment.service }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      <span v-if="appointment.status">
        {{ appointment.status }}
      </span>
      <span v-else>Pending</span>
    </div>
    <div
      class="overflow-hidden text-ellipsis text-center space-y-2 lg:space-y-0 lg:space-x-2"
    >
      <button
        class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
        @click="onAllowAccess()"
      >
        Allow
      </button>
      <button
        class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
        @click="onDisallowAccess()"
      >
        Deny
      </button>
    </div>
  </div>
</template>
