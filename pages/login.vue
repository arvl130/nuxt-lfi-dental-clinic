<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import BoxDialog from "~/components/dialogs/BoxDialog.vue"
import EmailNeedsVerificationDialog from "~/components/dialogs/EmailNeedsVerificationDialog.vue"
import { getAuth } from "firebase/auth"
import { computed, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { signIn } from "~/utils/auth/session"
import { userIsAdmin } from "~/utils/auth/user-role"
import { isFilledInMedicalChart } from "~/utils/api/charts/MedicalChart"
import { newAppointment } from "~/utils/api/user-appointments/Appointments"
import { useAppointmentDetailsStore } from "~/stores/appointmentDetails"

useHead({
  title: "Login \u2013 LFI Dental Clinic",
})

const isSuccessModalVisible = ref(false)
const accountCredentials = reactive({
  email: "",
  password: "",
})

const isSignInButtonClicked = ref(false)
const isSignInButtonEnabled = computed(() => {
  if (isSignInButtonClicked.value) return false

  // Account credentials should be valid.
  if (accountCredentials.email === "") return false
  if (accountCredentials.password === "") return false
  if (accountCredentials.password && accountCredentials.password.length < 8) {
    return false
  }

  return true
})

const appointmentDetailsStore = useAppointmentDetailsStore()
const router = useRouter()

const onSignIn = async () => {
  try {
    if (!isSignInButtonEnabled.value) return

    isSignInButtonClicked.value = true

    await signIn(accountCredentials.email, accountCredentials.password)

    // If the user is an Admin, go to the Admin Homepage and
    // return immediately.
    if (await userIsAdmin()) {
      router.push("/admin")
      return
    }

    // If we reach here, assume that the user is a patient.
    //
    // FIXME: We should handle the "never" case here.
    if (!appointmentDetailsStore.isInitialized) {
      router.push("/patient/history")
      return
    }

    const auth = getAuth()
    const isEmailVerified = auth.currentUser.emailVerified

    if (!isEmailVerified) {
      isEmailNeedsVerificationDialogVisible.value = true
      isSignInButtonClicked.value = false
      return
    }

    const patientUid = auth.currentUser.uid
    await schedulePendingAppointment(patientUid)

    isSignInButtonClicked.value = false
  } catch (e) {
    switch (e.code) {
      case "auth/invalid-email":
      case "auth/wrong-password":
      case "auth/user-not-found":
        errorDialogBody.value =
          "You have entered an incorrect email or password."
        isErrorDialogVisible.value = true
        break
      default:
        errorDialogBody.value = `An unknown error occured. Code: ${e.code}`
        isErrorDialogVisible.value = true
        throw e
    }

    isSignInButtonClicked.value = false
  }
}

const errorDialogBody = ref("")
const isErrorDialogVisible = ref(false)
const isEmailNeedsVerificationDialogVisible = ref(false)

async function onEmailVerified() {
  isEmailNeedsVerificationDialogVisible.value = false

  // Email is now verified, schedule pending appointment
  // if there are any.
  if (!appointmentDetailsStore.isInitialized) return

  const auth = getAuth()
  const patientUid = auth.currentUser.uid

  await schedulePendingAppointment(patientUid)
}

async function schedulePendingAppointment(patientUid) {
  const medicalChartIsFilled = await isFilledInMedicalChart(patientUid)

  if (!medicalChartIsFilled) {
    // Redirect users to medical chart if not filled in.
    router.push("/appointments/medical-chart")
    return
  }

  // Set appointment if there is a queued appointment,
  // and the medical chart is already filled in.
  await newAppointment(
    patientUid,
    appointmentDetailsStore.getSlotSeconds,
    appointmentDetailsStore.getService
  )

  appointmentDetailsStore.$reset()
  isSuccessModalVisible.value = true
}
</script>

<template>
  <HeroSection>Login to your Account</HeroSection>

  <div class="max-w-[28rem] mx-auto px-3 pt-12 pb-16">
    <!-- Create account box -->
    <div class="rounded-2xl border border-teal-500 px-6 p-6 text-lg">
      <h3 class="text-center mb-6 text-2xl font-medium">
        Login to your Account
      </h3>
      <!-- Email -->
      <div class="mb-8">
        <input
          type="email"
          placeholder="Email *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountCredentials.email"
        />
      </div>
      <!-- Password -->
      <div class="mb-8">
        <input
          type="password"
          placeholder="Password *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountCredentials.password"
        />
      </div>
      <!-- Submit -->
      <div class="flex justify-between items-center">
        <NuxtLink
          to="/password-reset"
          class="hover:underline underline-offset-4"
        >
          Forgot Password?
        </NuxtLink>
        <button
          type="button"
          class="px-6 py-2 rounded-3xl bg-teal-500 hover:bg-teal-400 transition duration-200 text-white"
          :class="
            isSignInButtonEnabled ? '' : 'pointer-events-none bg-emerald-200'
          "
          @click="onSignIn()"
        >
          Login
        </button>
      </div>
    </div>
  </div>

  <BoxDialog v-if="isSuccessModalVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">✅ Success</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        <!-- Your account has been created. Some additional information will be asked
        in order to complete your appointment. -->
        We have scheduled your appointment with one of our dentists. Please
        remember to attend your appointment on the reserved date and time.
      </div>
      <div class="max-w-[32rem] text-justify mb-3">
        You may cancel your appointment up to
        <span class="font-semibold">three (3) days</span> prior to the scheduled
        date.
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <NuxtLink class="border border-sky-600 px-6 py-1" to="/patient/history">
          Done
        </NuxtLink>
      </div>
    </template>
  </BoxDialog>

  <EmailNeedsVerificationDialog
    v-if="isEmailNeedsVerificationDialogVisible"
    @email-verified="onEmailVerified"
  />

  <BoxDialog v-if="isErrorDialogVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">Login Failed</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        {{ errorDialogBody }}
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="border border-sky-600 px-6 py-1"
          @click="isErrorDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
