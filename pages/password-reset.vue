<script setup>
import { getAuth, sendPasswordResetEmail } from "@firebase/auth"
import { computed, ref } from "vue"
import HeroSection from "~/components/patient/HeroSection.vue"
import BoxDialog from "~/components/dialogs/BoxDialog.vue"
import { FirebaseError } from "@firebase/util"

const enteredEmail = ref("")

const isResetLinkButtonEnabled = computed(() => {
  if (isResetLinkButtonClicked.value) return false
  if (enteredEmail.value === "") return false
  if (
    !enteredEmail.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return false

  return true
})

const isResetLinkSentDialogVisible = ref(false)
const isResetLinkButtonClicked = ref(false)

async function onSentPasswordResetLink() {
  if (!isResetLinkButtonEnabled.value) return

  try {
    isResetLinkButtonClicked.value = true
    const auth = getAuth()
    await sendPasswordResetEmail(auth, enteredEmail.value)
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code !== "auth/user-not-found")
        console.log("FirebaseError occured:", e.code)
    } else console.log("Error occured while sending password reset email.", e)
  } finally {
    isResetLinkSentDialogVisible.value = true
    isResetLinkButtonClicked.value = false
  }
}
</script>

<template>
  <HeroSection>Password Reset</HeroSection>
  <div class="max-w-[28rem] mx-auto px-3 pt-12 pb-16">
    <div class="rounded-2xl border border-teal-500 px-6 p-6 text-lg">
      <h3 class="mb-6 font-medium">
        Enter the email address used to create your account below:
      </h3>
      <!-- Email -->
      <div class="mb-8">
        <input
          type="email"
          placeholder="Email *"
          class="w-full px-4 py-2 rounded-full border border-teal-500"
          v-model="enteredEmail"
        />
      </div>
      <!-- Submit -->
      <div class="flex justify-between items-center">
        <NuxtLink to="/login" class="hover:underline underline-offset-4">
          Back
        </NuxtLink>
        <button
          type="button"
          class="px-6 py-2 rounded-3xl bg-teal-500 hover:bg-teal-400 transition duration-200 text-white text-base"
          :class="{
            'pointer-events-none': !isResetLinkButtonEnabled,
            'bg-emerald-200': !isResetLinkButtonEnabled,
          }"
          @click="onSentPasswordResetLink()"
        >
          Send Password Reset Link
        </button>
      </div>
    </div>
  </div>

  <BoxDialog v-if="isResetLinkSentDialogVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">
        We have received your request
      </div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        <p class="mb-3">
          If an account with your email is registered to our website, you will
          be receiving a password reset link.
        </p>
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="border border-sky-600 hover:border-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 font-medium px-6 py-1"
          @click="isResetLinkSentDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
