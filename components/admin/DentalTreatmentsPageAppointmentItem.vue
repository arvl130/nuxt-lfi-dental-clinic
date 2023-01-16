<script setup>
import { onMounted, reactive, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { getMonthDayYearOfTimeslot } from "~/utils/date-conversions"
import { setAppointmentPayment } from "~/utils/api/user-appointments/Appointments"
import CheckIcon from "../icons/CheckIcon.vue"
import PencilIcon from "../icons/PencilIcon.vue"

const route = useRoute()
const patientUid = route.params.uid
const props = defineProps({
  appointment: Object,
})
const emit = defineEmits(["reload"])

const isEditing = ref(false)

const appointmentPayment = reactive({
  price: 0,
  amountPaid: 0,
  status: null,
})

const balance = computed(() => {
  const result = appointmentPayment.price - appointmentPayment.amountPaid
  if (!isFinite(result)) return "Invalid"
  if (isNaN(result)) return "Invalid"
  if (result < 0) return "Invalid"

  return result
})

onMounted(async () => {
  appointmentPayment.price = props.appointment.price
  appointmentPayment.amountPaid = props.appointment.amountPaid
  appointmentPayment.status = props.appointment.status
})

const onEdit = () => {
  isEditing.value = true
}

const onSave = async () => {
  await setAppointmentPayment(
    patientUid,
    props.appointment.uid,
    appointmentPayment.price,
    appointmentPayment.amountPaid,
    appointmentPayment.status
  )
  emit("reload")
  isEditing.value = false
}
</script>

<template>
  <div
    class="border-b border-teal-500 p-4 gap-4 grid grid-cols-[repeat(2,_minmax(0,_10rem))_repeat(6,_minmax(0,_1fr))]"
  >
    <div class="overflow-hidden text-ellipsis">
      {{ getMonthDayYearOfTimeslot(appointment.uid) }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      {{ appointment.service }}
    </div>
    <div class="overflow-hidden text-ellipsis">
      <NuxtLink
        :to="`/admin/patient-records/${patientUid}/procedures/${appointment.uid}`"
      >
        View
      </NuxtLink>
    </div>
    <!-- Price -->
    <div class="overflow-hidden text-ellipsis">
      <div v-if="isEditing">
        <input
          type="number"
          min="0"
          step="0.01"
          class="w-full border border-grey-300"
          v-model="appointmentPayment.price"
        />
      </div>
      <div v-else>
        {{ appointmentPayment.price }}
      </div>
    </div>
    <!-- Amount Paid -->
    <div class="overflow-hidden text-ellipsis">
      <div v-if="isEditing">
        <input
          type="number"
          min="0"
          step="0.01"
          class="w-full border border-grey-300"
          v-model="appointmentPayment.amountPaid"
        />
      </div>
      <div v-else>
        {{ appointmentPayment.amountPaid }}
      </div>
    </div>
    <!-- Balance -->
    <div>
      {{ balance }}
    </div>
    <!-- Status -->
    <div class="overflow-hidden text-ellipsis">
      <div v-if="isEditing">
        <select v-model="appointmentPayment.status">
          <option :value="null">Choose ...</option>
          <option value="Paid">Yes</option>
          <option value="Unpaid">No</option>
        </select>
      </div>
      <div v-else>
        <div v-if="null === appointmentPayment.status">Pending</div>
        <div v-else>
          <span v-if="appointmentPayment.status === 'Paid'">Yes</span>
          <span v-else-if="appointmentPayment.status === 'Unpaid'">No</span>
        </div>
      </div>
    </div>
    <div class="overflow-hidden text-ellipsis">
      <button type="button" v-if="isEditing" @click="onSave()">
        <CheckIcon />
      </button>
      <button type="button" v-else @click="onEdit()">
        <PencilIcon />
      </button>
    </div>
  </div>
</template>
