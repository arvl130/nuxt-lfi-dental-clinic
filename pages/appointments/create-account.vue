<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import { useAppointmentDetailsStore } from "~/stores/appointmentDetails"
import { getAuth, sendEmailVerification } from "@firebase/auth"
import { computed, onUnmounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { signIn, signUpWithEmailAndPassword } from "~/utils//auth/session"
import BoxDialog from "~/dialogs/BoxDialog.vue"

const appointmentDetailsStore = useAppointmentDetailsStore()
onUnmounted(() => {
  appointmentDetailsStore.$reset()
})

const isSuccessModalVisible = ref(false)
const accountInformation = reactive({
  fullName: "",
  email: "",
  password: "",
  retypePassword: "",
})

const isCreateButtonClicked = ref(false)
const isCreateButtonEnabled = computed(() => {
  if (isCreateButtonClicked.value) return false

  // Account information should be valid.
  if (accountInformation.fullName === "") return false
  if (accountInformation.email === "") return false
  if (accountInformation.password === "") return false
  if (accountInformation.password && accountInformation.password.length < 8)
    return false
  if (accountInformation.retypePassword === "") return false
  if (
    accountInformation.retypePassword &&
    accountInformation.retypePassword !== accountInformation.password
  )
    return false

  return true
})

const onCreate = async () => {
  try {
    if (!isCreateButtonEnabled.value) return

    console.log("Disabled button")
    isCreateButtonClicked.value = true

    await signUpWithEmailAndPassword(
      accountInformation.email,
      accountInformation.password,
      accountInformation.fullName
    )

    await signIn(accountInformation.email, accountInformation.password)

    isSuccessModalVisible.value = true
    isCreateButtonClicked.value = false
  } catch (e) {
    const errorStr = e.message.split(": ")[e.message.split(": ").length - 1]
    switch (errorStr) {
      case "Email already exists":
        isErrorDialogVisible.value = true
        break
    }

    isCreateButtonClicked.value = false
  }
}

const isErrorDialogVisible = ref(false)

const isSendEmailVerificationButtonClicked = ref(false)
async function onSendEmailVerification() {
  try {
    if (isSendEmailVerificationButtonClicked.value) return

    isSendEmailVerificationButtonClicked.value = true

    sendEmailVerificationIntervalHandle.value = setInterval(() => {
      isSendEmailVerificationButtonClicked.value = false
    }, 60 * 1000)

    const auth = getAuth()
    await sendEmailVerification(auth.currentUser)
  } catch (e) {
    console.log("Error occured while sending email verification:", e)
  }
}

const router = useRouter()
const isEmailNotValidDialogVisible = ref(false)

async function onContinue() {
  try {
    const auth = getAuth()
    await auth.currentUser.reload()
    const isUserVerified = auth.currentUser.emailVerified
    if (isUserVerified) {
      router.push({
        name: "Appointments Page Medical Chart",
      })
    } else {
      isEmailNotValidDialogVisible.value = true
    }
  } catch (e) {
    console.log("Error occured while trying to continue:", e)
  }
}

const sendEmailVerificationIntervalHandle = ref(null)
onUnmounted(() => {
  if (null !== sendEmailVerificationIntervalHandle.value)
    clearInterval(sendEmailVerificationIntervalHandle.value)
})
</script>

<template>
  <HeroSection>Book an Appointment</HeroSection>
  <div class="max-w-[28rem] mx-auto px-3 pt-12 pb-16">
    <!-- Create account box -->
    <div class="rounded-2xl border border-teal-500 px-6 p-6 text-lg">
      <h3 class="text-center mb-6 text-2xl font-medium">Create an Account</h3>
      <!-- Full name -->
      <div class="mb-8">
        <input
          type="text"
          placeholder="Full name *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountInformation.fullName"
        />
      </div>
      <!-- Email -->
      <div class="mb-8">
        <input
          type="email"
          placeholder="Email *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountInformation.email"
        />
      </div>
      <!-- Password -->
      <div class="mb-6">
        <input
          type="password"
          placeholder="Password *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountInformation.password"
        />
        <div class="text-sm px-4">Password must be at least 8 characters.</div>
      </div>
      <!-- Retype Password -->
      <div class="mb-8">
        <input
          type="password"
          placeholder="Retype Password *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="accountInformation.retypePassword"
        />
      </div>
      <!-- Submit -->
      <div class="flex justify-center">
        <button
          type="button"
          class="px-6 py-2 rounded-3xl bg-teal-500 hover:bg-teal-400 transition duration-200 text-white"
          :class="
            isCreateButtonEnabled ? '' : 'pointer-events-none bg-emerald-200'
          "
          @click="onCreate()"
        >
          <span v-if="isCreateButtonEnabled">Create Account</span>
          <span v-else>Creating ...</span>
        </button>
      </div>
    </div>
  </div>

  <BoxDialog v-if="isSuccessModalVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">Account Created</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        <p class="mb-3">
          Your account has been created. To continue, we will need you to verify
          your account and fill in some information.
        </p>
        <p class="mb-3">
          Click the
          <span class="font-semibold">Send Verification Email</span> button
          below, and we will send you a link to verify your account. Once
          verified, click the
          <span class="font-semibold">Continue</span> button.
        </p>
        <p>
          <span class="font-bold">NOTE:</span> Please check your email's,
          <span class="font-bold">Inbox</span> and/or
          <span class="font-bold">Spam</span> folder for the verification email.
        </p>
      </div>
    </template>
    <template #actions>
      <div class="flex justify-between gap-4">
        <button
          type="button"
          class="border border-sky-600 bg-sky-600 hover:border-sky-500 hover:bg-sky-500 text-white transition duration-200 font-medium px-6 py-1"
          :class="
            isSendEmailVerificationButtonClicked
              ? 'pointer-events-none bg-sky-200 border-sky-200'
              : ''
          "
          @click="onSendEmailVerification"
        >
          Send Verification Email
        </button>
        <button
          type="button"
          class="border border-sky-600 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 font-medium px-6 py-1"
          @click="onContinue"
        >
          Continue
        </button>
      </div>
    </template>
  </BoxDialog>

  <BoxDialog v-if="isEmailNotValidDialogVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-2">
        Your account is not yet Verified
      </div>
    </template>
    <template #body>
      <div class="max-w-[30rem] text-justify mb-3">
        We have detected that your account is not yet verified. Please check
        your email's <span class="font-bold">Inbox</span> and/or
        <span class="font-bold">Spam</span> folder, and click the link to
        verify.
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="border border-sky-600 px-6 py-1 font-medium hover:bg-sky-600 hover:text-white transition duration-200"
          @click="isEmailNotValidDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>

  <BoxDialog v-if="isErrorDialogVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">Invalid email</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        The email you have entered is already in use. Please choose another
        email, or
        <NuxtLink
          to="/appointments/login"
          class="underline underline-offset-8 decoration-dotted hover:text-teal-500 transition duration-200 font-semibold"
        >
          Log In
        </NuxtLink>
        with an existing account.
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="border border-sky-600 px-6 py-1 font-medium hover:bg-sky-600 hover:text-white transition duration-200"
          @click="isErrorDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
