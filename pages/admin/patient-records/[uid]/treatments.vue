<script setup>
import DentalTreatmentsPageAppointmentItem from "~/components/admin/DentalTreatmentsPageAppointmentItem.vue"
import { useRoute } from "vue-router"
import { getUserAppointments } from "~/utils/api/user-appointments/Appointments"
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth"

useHead({
  title: "Dental Treatments \u2013 LFI Dental Clinic",
})

definePageMeta({ layout: "admin" })

const route = useRoute()
const patientUid = route.params.uid

async function loadUserAppointments(patientUid) {
  appointments.value = await getUserAppointments(patientUid)
}

const appointments = ref([])
const { currentUser } = storeToRefs(useAuthStore())

watchEffect(async () => {
  if (!currentUser.value) return

  await loadUserAppointments(patientUid)
})

const attendedAppointments = computed(() => {
  return appointments.value.filter(
    (appointment) => appointment.attended === true
  )
})
</script>
<template>
  <div>
    <h1 class="text-2xl font-semibold mb-3">
      <NuxtLink to="/admin/patient-records">Patient Records</NuxtLink>
      >
      <NuxtLink :to="`/admin/patient-records/${patientUid}/treatments`">
        Dental Treatment
      </NuxtLink>
    </h1>
  </div>
  <div
    class="bg-teal-500/40 p-4 mt-4 gap-4 grid grid-cols-[repeat(2,_minmax(0,_10rem))_repeat(6,_minmax(0,_1fr))] font-semibold"
  >
    <div class="overflow-hidden text-ellipsis">DATE</div>
    <div class="overflow-hidden text-ellipsis">SERVICE</div>
    <div class="overflow-hidden text-ellipsis">PROCEDURE</div>
    <div class="overflow-hidden text-ellipsis">PRICE</div>
    <div class="overflow-hidden text-ellipsis">AMOUNT PAID</div>
    <div class="overflow-hidden text-ellipsis">BALANCE</div>
    <div class="overflow-hidden text-ellipsis">HAS PAID</div>
    <div class="overflow-hidden text-ellipsis">ACTIONS</div>
  </div>
  <DentalTreatmentsPageAppointmentItem
    v-for="appointment in attendedAppointments"
    :key="appointment.uid"
    :appointment="appointment"
    @reload="loadUserAppointments(patientUid)"
  />
</template>
