<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import { getUserAppointmentProcedure } from "~/utils/api/user-appointments/AppointmentProcedures"
import { useAuthStore } from "~/stores/auth"
import { storeToRefs } from "pinia"

definePageMeta({
  layout: "patient",
})

const route = useRoute()
const { timeslot } = route.params

const isFinishedLoading = ref(false)
const procedure = reactive({
  body: "",
  visible: null,
})

const { currentUser } = storeToRefs(useAuthStore())

watchEffect(async () => {
  if (currentUser.value) {
    const patientUid = currentUser.value.uid
    const appointmentProcedure = await getUserAppointmentProcedure(
      patientUid,
      timeslot
    )

    procedure.visible = appointmentProcedure.procedureVisible
    procedure.body = appointmentProcedure.procedure

    await nextTick()

    isFinishedLoading.value = true
  }
})
</script>

<template>
  <HeroSection>My Account</HeroSection>
  <div class="max-w-5xl mx-auto py-12 px-6 text-sky-700">
    <h3 class="justify-start text-3xl font-semibold text-left pb-3">
      <NuxtLink to="/patient/history"> My Appointments </NuxtLink>
      >
      <NuxtLink :to="`/patient/procedure/${timeslot}`">
        Dental Treatment
      </NuxtLink>
    </h3>
    <div
      class="border border-teal-500 p-5 h-72 max-w-prose mx-auto mt-6"
      v-if="isFinishedLoading"
    >
      {{ procedure.body }}
    </div>
    <div class="text-2xl font-bold text-center mt-12" v-else>
      Loading procedure ...
    </div>
  </div>
</template>
