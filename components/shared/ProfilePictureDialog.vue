<script setup>
import { ref } from "vue"
import BoxDialog from "../../components/dialogs/BoxDialog.vue"
import {
  uploadProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
} from "~/utils/auth/account-details"
import { useProfilePictureStore } from "~/stores/profilePicture"
import { getDownloadURL } from "~/utils/download-url"

const props = defineProps({
  userInfo: Object,
})
const emit = defineEmits(["closeDialog", "updateProfilePicture"])

const inputFile = ref()
const isUpdateProfilePictureVisible = ref(false)

const onChangeInputFile = (e) => {
  if (e.target.files.length > 0) {
    isUpdateProfilePictureVisible.value = true
  }
}

const onChangeProfilePicture = async () => {
  if (inputFile.value.files.length === 1) {
    const imagePath = await uploadProfilePicture(inputFile.value.files[0])
    await updateProfilePicture(imagePath)
    profilePictureStore.$reset()
    await profilePictureStore.initialize()
    const imageDownloadUrl = await getDownloadURL(imagePath)

    // Reset input file.
    inputFile.value.value = ""
    // Hide update button.
    isUpdateProfilePictureVisible.value = false
    // Inform parent component of updated values.
    emit("updateProfilePicture", imagePath, imageDownloadUrl)
  }
}

const profilePictureStore = useProfilePictureStore()
const onRemoveProfilePicture = async () => {
  if (props.userInfo.profilePictureURL) {
    await deleteProfilePicture()
    await updateProfilePicture("")

    profilePictureStore.$reset()
    await profilePictureStore.initialize()

    emit("updateProfilePicture", "", "")
  }
}
</script>
<template>
  <BoxDialog>
    <template #body>
      <div class="mb-5 text-center">
        <div class="mb-3" v-if="userInfo.profilePictureURL">
          <img
            :src="userInfo.profilePictureDownloadURL"
            alt="Profile picture"
            class="h-36 w-36 rounded-full object-cover mx-auto"
          />
        </div>
        <div v-else>
          <img
            src="../../assets/img/nav-person.png"
            alt="Person icon"
            class="h-36 w-36 object-cover mx-auto"
          />
        </div>
        <div class="mb-3">Change Profile Picture</div>
        <div>
          <input
            type="file"
            accept="image/*"
            class="text-sm min-w-0 w-[min(100%,_12rem)]"
            ref="inputFile"
            @change="onChangeInputFile"
          />
        </div>
      </div>
    </template>
    <template #actions>
      <div class="flex flex-col xs:flex-row justify-between gap-4">
        <button
          type="button"
          class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
          @click="onRemoveProfilePicture()"
          v-if="userInfo.profilePictureURL"
        >
          Remove
        </button>
        <div>
          <button
            type="button"
            class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
            @click="onChangeProfilePicture()"
            v-if="isUpdateProfilePictureVisible"
          >
            Update
          </button>
        </div>
        <button
          type="button"
          class="font-semibold border border-sky-600 px-2 py-1 text-sm hover:bg-sky-600 hover:text-white transition duration-200 rounded-md"
          @click="emit('closeDialog')"
        >
          Close
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
