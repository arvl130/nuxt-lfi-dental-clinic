<script setup>
import { onMounted, ref } from "vue"
import {
  getMonthDayYearOfTimeslot,
  getHoursMinutesOfTimeslot,
} from "~/utils/date-conversions"
import { getUserProfile } from "~/utils/api/UserProfiles"
import {
  setUserAppointmentAttended,
  setUserAppointmentNotAttended,
  setUserAppointmentPending,
} from "~/utils/api/user-appointments/AppointmentProceduresAttended"

const props = defineProps({
  timeslot: String,
  service: String,
  patientUid: String,
  attended: [Boolean, String],
})

const userProfile = ref(null)
const attended = ref(null)
onMounted(async () => {
  attended.value = props.attended
  switch (props.attended) {
    case true:
      attended.value = "Yes"
      break
    case false:
      attended.value = "No"
      break
    case "pending":
      attended.value = "pending"
      break
  }
  userProfile.value = await getUserProfile(props.patientUid)
})

const emit = defineEmits(["attended-changed"])

const onInput = async (e) => {
  switch (e.target.value) {
    case "Yes":
      attended.value = e.target.value
      await setUserAppointmentAttended(props.patientUid, props.timeslot)
      emit("attended-changed", attended.value, props.timeslot)
      break
    case "No":
      attended.value = e.target.value
      await setUserAppointmentNotAttended(props.patientUid, props.timeslot)
      emit("attended-changed", attended.value, props.timeslot)
      break
    case "pending":
      attended.value = e.target.value
      await setUserAppointmentPending(props.patientUid, props.timeslot)
      emit("attended-changed", attended.value, props.timeslot)
      break
  }
}
</script>

<template>
  <div class="grid grid-cols-5 gap-4 py-4 px-6 border-b border-teal-500">
    <div class="overflow-hidden text-ellipsis">
      {{ getMonthDayYearOfTimeslot(parseInt(props.timeslot)) }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      <span v-if="userProfile">
        {{ userProfile.userRecord.displayName }}
      </span>
      <span v-else>Loading ...</span>
    </div>
    <div class="overflow-hidden text-ellipsis">
      {{ props.service }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      {{ getHoursMinutesOfTimeslot(parseInt(props.timeslot)) }}
    </div>
    <div>
      <select @input="onInput" :value="attended" v-if="attended">
        <option value="pending" selected>Choose ...</option>
        <option>Yes</option>
        <option>No</option>
      </select>
      <span v-else>Loading ...</span>
    </div>
  </div>
</template>
