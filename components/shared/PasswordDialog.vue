<script setup>
import { computed, reactive, ref } from "vue"
import BoxDialog from "../dialogs/BoxDialog.vue"
import { updatePassword } from "~/utils/auth/account-details"

const emit = defineEmits(["closeDialog"])

const userCredentials = reactive({
  newPassword: "",
  password: "",
})

const onChangePassword = async () => {
  try {
    await updatePassword(userCredentials.newPassword, userCredentials.password)
    emit("closeDialog")
  } catch (e) {
    switch (e.code) {
      case "auth/wrong-password":
        isErrorDialogVisible.value = true
        errorDialog.header = "Wrong password"
        errorDialog.body = "Please enter the correct password."
        break
      default:
        throw e
    }
  } finally {
    userCredentials.password = ""
    userCredentials.newPassword = ""
  }
}

const isUpdateButtonVisible = computed(() => {
  if (userCredentials.password === "") return false
  if (userCredentials.newPassword === "") return false

  return true
})

const isErrorDialogVisible = ref(false)
const errorDialog = reactive({
  header: "",
  body: "",
})
</script>

<template>
  <BoxDialog>
    <template #body>
      <div class="mb-3">
        <div>Old Password:</div>
        <input
          type="password"
          class="border border-sky-600 px-2 py-1 min-w-0 w-full rounded-md"
          v-model="userCredentials.password"
        />
      </div>
      <div class="mb-5">
        <div>New Password:</div>
        <input
          type="password"
          class="border border-sky-600 px-2 py-1 min-w-0 w-full rounded-md"
          v-model="userCredentials.newPassword"
        />
      </div>
    </template>
    <template #actions>
      <div class="flex gap-2 flex-col xs:flex-row xs:gap-0 justify-between">
        <button
          type="button"
          class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
          @click="emit('closeDialog')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
          v-if="isUpdateButtonVisible"
          @click="onChangePassword()"
        >
          Update
        </button>
      </div>
    </template>
  </BoxDialog>
  <!-- Error Dialog -->
  <BoxDialog v-if="isErrorDialogVisible">
    <template #header>
      <div class="text-2xl font-semibold">
        {{ errorDialog.header }}
      </div>
    </template>
    <template #body>
      <div class="mb-3">
        {{ errorDialog.body }}
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="font-semibold border border-sky-600 px-4 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200"
          @click="isErrorDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
