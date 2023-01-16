<script lang="ts" setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import MyHistoryPageAppointmentItem from "~/components/patient/MyHistoryPageAppointmentItem.vue"
import { getUserAppointments } from "~/utils/api/user-appointments/Appointments"
import { useAuthStore } from "~/stores/auth"
import { storeToRefs } from "pinia"

definePageMeta({
  layout: "patient",
})

type UserAppointment = {
  uid: string
  createdAt: {
    _seconds: number
    _nanoseconds: number
  }
  status: boolean | null
  month: number
  price: 0
  amountPaid: 0
  attended: boolean | "pending"
  procedureVisible: boolean | "requesting"
  procedure: string
  service: string
}

const userAppointments = ref<UserAppointment[]>([])
const { currentUser, isLoading: isLoadingUser } = storeToRefs(useAuthStore())

const isLoadingAppointments = ref(true)

async function loadUserAppointments(patientUid: string) {
  userAppointments.value = await getUserAppointments(patientUid)
  isLoadingAppointments.value = false
}

watchEffect(() => {
  if (currentUser.value) loadUserAppointments(currentUser.value.uid)
})

function onUserAppointmentsUpdated() {
  if (currentUser.value) loadUserAppointments(currentUser.value.uid)
}
</script>
<template>
  <HeroSection>My Account</HeroSection>
  <div class="max-w-6xl mx-auto text-sky-700 py-12 px-6">
    <h3 class="justify-start text-3xl font-semibold text-left pb-3">
      My Appointments
    </h3>
    <div v-if="isLoadingUser" class="text-center">Loading patient ...</div>
    <div v-else>
      <!-- Table -->
      <div v-if="isLoadingAppointments" class="text-center">
        Loading appointments ...
      </div>
      <div v-else>
        <!-- Header -->
        <div
          class="hidden sm:grid grid-cols-7 font-semibold px-6 py-3 bg-teal-500/40 uppercase"
        >
          <div class="overflow-hidden text-ellipsis">DATE</div>
          <div class="overflow-hidden text-ellipsis">SERVICE</div>
          <div class="overflow-hidden text-ellipsis">PROCEDURE</div>
          <div class="overflow-hidden text-ellipsis">PRICE</div>
          <div class="overflow-hidden text-ellipsis">BALANCE</div>
          <div class="overflow-hidden text-ellipsis">ATTENDED</div>
          <div class="overflow-hidden text-ellipsis text-center">Actions</div>
        </div>
        <!-- Body -->
        <div class="grid gap-4 sm:block" v-if="userAppointments.length > 0">
          <MyHistoryPageAppointmentItem
            v-for="userAppointment in userAppointments"
            :key="userAppointment.uid"
            :appointment="userAppointment"
            @updated="onUserAppointmentsUpdated"
          />
        </div>
        <div class="text-center mt-8 text-lg" v-else>
          No Appointments Scheduled
        </div>
      </div>
    </div>
  </div>
</template>
