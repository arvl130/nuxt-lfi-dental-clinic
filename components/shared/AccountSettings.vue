<script setup>
import BoxDialog from "../dialogs/BoxDialog.vue"
import PasswordDialog from "./PasswordDialog.vue"
import ProfilePictureDialog from "./ProfilePictureDialog.vue"
import { updateEmail, updateFullName } from "~/utils/auth/account-details"
import { getDownloadURL } from "~/utils/download-url"
import { useUserFullnameStore } from "~/stores/userFullname"
import { useAuthStore } from "~/stores/auth"
import { storeToRefs } from "pinia"

const userInfo = reactive({
  fullName: "",
  email: "",
  profilePictureURL: "",
  profilePictureDownloadURL: "",
})

const { currentUser, isLoading: isLoadingUser } = storeToRefs(useAuthStore())

watchEffect(async () => {
  if (!currentUser.value) return

  userInfo.fullName = currentUser.value.displayName
  userInfo.email = currentUser.value.email
  userInfo.profilePictureURL = currentUser.value.photoURL
  if (userInfo.profilePictureURL)
    userInfo.profilePictureDownloadURL = await getDownloadURL(
      userInfo.profilePictureURL
    )
})

const userCredentials = reactive({
  newEmail: "",
  newPassword: "",
  password: "",
  fullName: "",
})

const clearUserCredentials = () => {
  Object.keys(userCredentials).forEach((property) => {
    userCredentials[property] = ""
  })
}

const isEmailDialogVisible = ref(false)
const onChangeEmail = async () => {
  try {
    await updateEmail(userCredentials.password, userCredentials.newEmail)
    userInfo.email = userCredentials.newEmail
    isEmailDialogVisible.value = false
  } catch (e) {
    switch (e.code) {
      case "auth/invalid-email":
        isErrorDialogVisible.value = true
        errorDialog.header = "Invalid email"
        errorDialog.body = "Please enter a valid email address."
        break
      case "auth/wrong-password":
        isErrorDialogVisible.value = true
        errorDialog.header = "Wrong password"
        errorDialog.body = "Please enter the correct password."
        break
      default:
        throw e
    }
  } finally {
    clearUserCredentials()
  }
}

const userFullnameStore = useUserFullnameStore()

const isNameDialogVisible = ref(false)
const onChangeName = async () => {
  await updateFullName(userCredentials.fullName)
  userInfo.fullName = userCredentials.fullName
  userFullnameStore.$reset()
  await userFullnameStore.initialize()
  isNameDialogVisible.value = false
  clearUserCredentials()
}

const isPasswordlDialogVisible = ref(false)
const isProfilePicturelDialogVisible = ref(false)

function updateProfilePicture(url, downloadUrl) {
  userInfo.profilePictureURL = url
  userInfo.profilePictureDownloadURL = downloadUrl
}

const isErrorDialogVisible = ref(false)
const errorDialog = reactive({
  header: "",
  body: "",
})
</script>

<template>
  <div v-if="isLoadingUser" class="max-w-4xl mx-auto px-6 py-12 text-center">
    Loading user ...
  </div>
  <div v-else>
    <div class="max-w-4xl mx-auto px-6 pt-12 pb-24">
      <h1 class="text-3xl mb-3 font-semibold">Account Settings</h1>
      <div class="border-y-[3px] border-teal-500">
        <!-- Profile Picture -->
        <div class="border-b border-teal-500 p-4 grid grid-cols-[2fr_4fr_3fr]">
          <div class="font-semibold">Profile Picture</div>
          <div></div>
          <div class="text-right text-teal-500 hover:text-teal-400">
            <button
              type="button"
              @click="isProfilePicturelDialogVisible = true"
            >
              Edit
            </button>
          </div>
        </div>
        <!-- Name -->
        <div
          class="border-b-[1px] border-teal-500 p-4 grid sm:grid-cols-[2fr_4fr_3fr]"
        >
          <div class="font-semibold flex justify-between">
            <div>Name</div>
            <div class="text-right text-teal-500 hover:text-teal-400 sm:hidden">
              <button type="button" @click="isNameDialogVisible = true">
                Edit
              </button>
            </div>
          </div>
          <div class="overflow-hidden text-ellipsis">
            {{ userInfo.fullName }}
          </div>
          <div
            class="text-right text-teal-500 hover:text-teal-400 hidden sm:block"
          >
            <button type="button" @click="isNameDialogVisible = true">
              Edit
            </button>
          </div>
        </div>

        <!-- Email -->
        <div
          class="border-b-[1px] border-teal-500 p-4 grid sm:grid-cols-[2fr_4fr_3fr]"
        >
          <div class="font-semibold flex justify-between">
            <div>Email</div>
            <div class="text-right text-teal-500 hover:text-teal-400 sm:hidden">
              <button type="button" @click="isEmailDialogVisible = true">
                Edit
              </button>
            </div>
          </div>
          <div class="overflow-hidden text-ellipsis">{{ userInfo.email }}</div>
          <div
            class="text-right text-teal-500 hover:text-teal-400 hidden sm:block"
          >
            <button type="button" @click="isEmailDialogVisible = true">
              Edit
            </button>
          </div>
        </div>
        <!-- Password -->
        <div class="p-4 grid sm:grid-cols-[2fr_4fr_3fr]">
          <div class="font-semibold">Password</div>
          <div>********</div>
          <div
            class="text-right text-teal-500 hover:text-teal-400"
            @click="isPasswordlDialogVisible = true"
          >
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Email dialog -->
    <BoxDialog v-if="isEmailDialogVisible">
      <template #body>
        <div class="mb-3">
          <div>New Email:</div>
          <input
            type="text"
            class="border border-sky-600 px-2 py-1 min-w-0 w-full rounded-md"
            v-model="userCredentials.newEmail"
          />
        </div>
        <div class="mb-5">
          <div>Password:</div>
          <input
            type="password"
            class="border border-sky-600 px-2 py-1 min-w-0 w-full rounded-md"
            v-model="userCredentials.password"
          />
        </div>
      </template>
      <template #actions>
        <div class="flex gap-2 flex-col xs:flex-row xs:gap-0 justify-between">
          <button
            type="button"
            class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
            @click="isEmailDialogVisible = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
            @click="onChangeEmail()"
          >
            Save
          </button>
        </div>
      </template>
    </BoxDialog>

    <!-- Name dialog -->
    <BoxDialog v-if="isNameDialogVisible">
      <template #body>
        <div class="mb-5">
          <div>Name:</div>
          <input
            type="text"
            class="border border-sky-600 px-2 py-1 min-w-0 w-full rounded-md"
            v-model="userCredentials.fullName"
          />
        </div>
      </template>
      <template #actions>
        <div class="flex gap-2 flex-col xs:flex-row xs:gap-0 justify-between">
          <button
            type="button"
            class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
            @click="isNameDialogVisible = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
            @click="onChangeName()"
          >
            Save
          </button>
        </div>
      </template>
    </BoxDialog>

    <!-- Password dialog -->
    <PasswordDialog
      v-if="isPasswordlDialogVisible"
      @closeDialog="isPasswordlDialogVisible = false"
    />

    <!-- Profile Picture dialog -->
    <ProfilePictureDialog
      v-if="isProfilePicturelDialogVisible"
      :userInfo="userInfo"
      @closeDialog="isProfilePicturelDialogVisible = false"
      @updateProfilePicture="updateProfilePicture"
    />

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
  </div>
</template>
