<script setup>
import { getAuth, sendEmailVerification } from "@firebase/auth"
import { ref, onUnmounted } from "vue"
import BoxDialog from "./BoxDialog.vue"

const isEmailNotActuallyVerifiedDialogVisible = ref(false)
const isSendEmailVerificationButtonClicked = ref(false)
const sendEmailVerificationIntervalHandle = ref(null)

const emit = defineEmits(["email-verified"])

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

async function onConfirmEmailVerified() {
  const auth = getAuth()
  await auth.currentUser.reload()

  const isUserVerified = auth.currentUser.emailVerified
  if (!isUserVerified) {
    isEmailNotActuallyVerifiedDialogVisible.value = true
    return
  }

  emit("email-verified")
}

onUnmounted(() => {
  if (null !== sendEmailVerificationIntervalHandle.value)
    clearInterval(sendEmailVerificationIntervalHandle.value)
})
</script>

<template>
  <BoxDialog>
    <template #header>
      <div class="font-semibold text-2xl mb-1">Email is not yet Verified</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        <p class="mb-3">
          We have detected that your account is not yet verified. To continue,
          we will need you to verify your account.
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
          @click="onConfirmEmailVerified"
        >
          Continue
        </button>
      </div>
    </template>
  </BoxDialog>

  <BoxDialog v-if="isEmailNotActuallyVerifiedDialogVisible">
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
          @click="isEmailNotActuallyVerifiedDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
