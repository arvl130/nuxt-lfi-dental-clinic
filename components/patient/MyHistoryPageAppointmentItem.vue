<script setup>
import {
  requestProcedureAccess,
  cancelRequestProcedureAccess,
} from "~/utils/api/user-appointments/AppointmentProcedureAccess"
import { getAuth } from "firebase/auth"
import { cancelAppointment } from "~/utils/api/user-appointments/Appointments"
import SimpleModalDialog from "../admin/SimpleModalDialog.vue"
import { onMounted, ref } from "vue"
import {
  getDateTwoDaysBeforeTimeslot,
  getMonthDayYearOfTimeslot,
  getHoursMinutesOfTimeslot,
} from "~/utils/date-conversions"

const props = defineProps({
  appointment: Object,
})

const onRequestAccess = async () => {
  const auth = getAuth()
  const patientUid = auth.currentUser.uid
  await requestProcedureAccess(patientUid, props.appointment.uid)
  emit("updated")
}

const onCancelRequestAccess = async () => {
  const auth = getAuth()
  const patientUid = auth.currentUser.uid
  await cancelRequestProcedureAccess(patientUid, props.appointment.uid)
  emit("updated")
}

const isCancelDialogVisible = ref(false)
const onShowCancelDialog = () => {
  if (Date.now() < cancelDeadline.value.getTime())
    isCancelDialogVisible.value = true
}

const emit = defineEmits(["updated"])

const onCancelAppointment = async () => {
  const auth = getAuth()
  const patientUid = auth.currentUser.uid
  await cancelAppointment(patientUid, props.appointment.uid)
  emit("updated")
}

const cancelDeadline = ref(null)

onMounted(() => {
  cancelDeadline.value = getDateTwoDaysBeforeTimeslot(
    parseInt(props.appointment.uid)
  )
})
</script>

<template>
  <!-- Desktop -->
  <div
    class="hidden sm:grid grid-cols-7 px-6 py-3 border-b border-teal-500 items-center"
  >
    <div class="overflow-hidden text-ellipsis">
      {{ getMonthDayYearOfTimeslot(appointment.uid) }}
      {{ getHoursMinutesOfTimeslot(appointment.uid) }}
    </div>
    <div class="overflow-hidden text-ellipsis">{{ appointment.service }}</div>
    <div class="overflow-hidden text-ellipsis">
      <div v-if="true === appointment.attended">
        <NuxtLink
          :to="`/patient/procedure/${appointment.uid}`"
          v-if="true === appointment.procedureVisible"
          class="font-medium"
        >
          View
        </NuxtLink>
        <button
          type="button"
          class="font-medium"
          @click="onRequestAccess()"
          v-else-if="false === appointment.procedureVisible"
        >
          Request Access
        </button>
        <button
          type="button"
          class="font-medium"
          @click="onCancelRequestAccess()"
          v-else
        >
          Cancel request
        </button>
      </div>
    </div>
    <div class="overflow-hidden text-ellipsis">
      <span v-if="appointment.price === 0">No price set</span>
      <span v-else>
        {{ appointment.price }}
      </span>
    </div>
    <div class="overflow-hidden text-ellipsis">{{ appointment.balance }}</div>
    <div class="overflow-hidden text-ellipsis">
      <span v-if="appointment.attended === 'pending'">Not Yet Attended</span>
      <span v-else-if="appointment.attended === true">
        Did Attend
        <span v-if="null !== appointment.status">
          ({{ appointment.status }})
        </span>
      </span>
      <span v-else-if="appointment.attended === false">
        Did Not Attend
        <span v-if="null !== appointment.status">
          ({{ appointment.status }})
        </span>
      </span>
    </div>
    <div class="text-center">
      <button
        v-if="cancelDeadline && appointment.attended === 'pending'"
        type="button"
        @click="onShowCancelDialog()"
        :class="{
          'text-gray-300': !(Date.now() < cancelDeadline.getTime()),
        }"
        :title="
          Date.now() < cancelDeadline.getTime()
            ? ''
            : 'You may only cancel up to three (3) days before the appointment'
        "
      >
        Cancel
      </button>
    </div>
  </div>

  <!-- Mobile -->
  <div class="sm:hidden border border-teal-500 px-6 py-4 rounded-3xl">
    <div>
      <div class="font-medium text-teal-500">Date</div>
      <div class="font-semibold text-2xl leading-5 mb-3">
        {{ getMonthDayYearOfTimeslot(appointment.uid) }}
        {{ getHoursMinutesOfTimeslot(appointment.uid) }}
      </div>
    </div>
    <div>
      <div class="font-medium text-teal-500">Service</div>
      <div class="font-semibold text-2xl leading-5 mb-3">
        {{ appointment.service }}
      </div>
    </div>
    <div>
      <div class="font-medium text-teal-500">Price</div>
      <div class="font-semibold text-2xl leading-5 mb-3">
        <span v-if="appointment.price === 0">No price set</span>
        <span v-else>
          {{ appointment.price }}
        </span>
      </div>
    </div>
    <div>
      <div class="font-medium text-teal-500">Balance</div>
      <div class="font-semibold text-2xl leading-5 mb-3">
        {{ appointment.balance }}
      </div>
    </div>
    <div>
      <div class="font-medium text-teal-500">Status</div>
      <div class="font-semibold text-2xl leading-5 mb-3">
        <span v-if="appointment.attended === 'pending'">
          Not Yet Attended
        </span>
        <span v-else-if="appointment.attended === true">
          Did Attend
          <span v-if="null !== appointment.status">
            ({{ appointment.status }})
          </span>
        </span>
        <span v-else-if="appointment.attended === false">
          Did Not Attend
          <span v-if="null !== appointment.status">
            ({{ appointment.status }})
          </span>
        </span>
      </div>
    </div>
    <div>
      <div class="font-medium text-teal-500">Actions</div>
      <!-- Request Procedure -->
      <div class="text-center mb-3" v-if="true === appointment.attended">
        <NuxtLink
          :to="`/patient/procedure/${appointment.uid}`"
          v-if="true === appointment.procedureVisible"
          class="w-full xs:w-64 inline-block text-center bg-sky-400 text-white px-3 py-2 rounded-lg font-semibold hover:bg-sky-500 transition duration-200"
        >
          View
        </NuxtLink>
        <button
          type="button"
          class="w-full xs:w-64 bg-teal-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-teal-400 transition duration-200"
          @click="onRequestAccess()"
          v-else-if="false === appointment.procedureVisible"
        >
          Request Access
        </button>
        <button
          type="button"
          class="w-full xs:w-64 bg-red-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-400 transition duration-200"
          @click="onCancelRequestAccess()"
          v-else
        >
          Cancel request
        </button>
      </div>
      <!-- Cancel Service -->
      <div class="text-center">
        <button
          v-if="
            cancelDeadline &&
            appointment.attended === 'pending' &&
            Date.now() < cancelDeadline.getTime()
          "
          type="button"
          @click="onShowCancelDialog()"
          class="w-full xs:w-64 border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-3 py-2 rounded-lg font-semibold transition duration-200"
          title="You may only cancel up to three (3) days before the appointment"
        >
          Cancel
        </button>
        <button
          v-else-if="cancelDeadline && appointment.attended === 'pending'"
          type="button"
          class="w-full xs:w-64 border border-gray-500 text-gray-500 cursor-not-allowed px-3 py-2 rounded-lg font-semibold transition duration-200"
          :class="{
            'text-gray-300': !(Date.now() < cancelDeadline.getTime()),
          }"
          :title="
            Date.now() < cancelDeadline.getTime()
              ? ''
              : 'You may only cancel up to three (3) days before the appointment'
          "
        >
          Cancel
        </button>
      </div>
    </div>
  </div>

  <SimpleModalDialog v-if="isCancelDialogVisible">
    <template #header>
      <div class="font-semibold text-xl mb-2">Cancel Appointment</div>
    </template>
    <template #body>
      <div class="max-w-[30rem] text-justify mb-2">
        The following action will cancel the appointment, and allow others to
        reserve it. You may reserve it again later, if it is still available.
        Continue?
      </div>
    </template>
    <template #actions>
      <div class="flex gap-2 flex-col xs:flex-row xs:gap-0 justify-between">
        <button
          type="button"
          class="bg-teal-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-teal-400 transition duration-200"
          @click="isCancelDialogVisible = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-400 transition duration-200"
          @click="onCancelAppointment()"
        >
          Continue
        </button>
      </div>
    </template>
  </SimpleModalDialog>
</template>
