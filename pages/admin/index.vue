<script setup>
import SimpleModalDialog from "~/components/admin/SimpleModalDialog.vue"
import { getReminders, setReminders } from "~/utils/api/Reminders"
import { useAuthStore } from "~/stores/auth"
import { storeToRefs } from "pinia"

definePageMeta({ layout: "admin" })

const isEditing = ref(false)
const reminders = reactive({
  message: "",
})

const { currentUser } = storeToRefs(useAuthStore())
const showReminders = ref(false)

watchEffect(async () => {
  if (!currentUser.value) return

  const { message } = await getReminders()
  if (message) {
    reminders.message = message
    showReminders.value = true
  }
})

const onEdit = () => {
  isEditing.value = true
}

const onSave = async () => {
  await setReminders(reminders.message)
  isEditing.value = false
}
</script>

<template>
  <div
    class="flex divide-x-2 rounded-none divide-sky-700 justify-end md:hidden lg:hidden"
  >
    <NuxtLink
      class="inline-block text-sky-700 hover:bg-gray-100 focus:outline-none rounded-lg text-sm p-1.5"
      type="button"
      to="/admin/notifications"
    >
      <span class="sr-only">Open dropdown</span>
      <svg
        class="w-6 h-6 mx-auto"
        fill=" currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        ></path>
      </svg>
    </NuxtLink>
    <NuxtLink
      class="inline-block text-sky-700 hover:bg-gray-100 focus:outline-none text-sm p-1.5"
      type="button"
      to="/admin/account-settings"
    >
      <span class="sr-only">Open dropdown</span>
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </NuxtLink>
  </div>

  <div class="grid grid-rows-[auto_1fr] h-full lg:p-6">
    <!-- Banner -->
    <div class="flex flex-col md:flex-row items-center pb-20">
      <img
        src="~/assets/img/lfi-logo.png"
        class="h-28 mr-4 pointer-events-none"
      />
      <div
        class="text-4xl leading-10 font-light max-w-[29ch] text-center md:text-left"
      >
        Welcome back to L.F.I. Dental Clinic. Have a great day!
      </div>
    </div>
    <div class="grid lg:grid-cols-[auto_1fr]">
      <!-- Big Buttons -->
      <div
        class="grid justify-center xl:grid-cols-2 max-w-2xl gap-12 auto-rows-[10rem]"
      >
        <NuxtLink
          class="bg-gradient-to-br from-sky-700 to-teal-500/40 text-white max-w-xs hover:bg-teal-500 transition duration-200 h-40 block py-10 p-16 items-center justify-center text-xl rounded-2xl"
          to="/admin/appointments"
        >
          <svg
            class="w-10 h-10 mx-auto items-center"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            ></path>
          </svg>
          <div class="mx-auto text-center">Appointments</div>
        </NuxtLink>
        <NuxtLink
          class="bg-gradient-to-br from-sky-700 to-teal-500/40 text-white max-w-xs hover:bg-teal-500 transition duration-200 h-40 block py-10 p-16 items-center justify-center text-xl rounded-2xl"
          to="/admin/patient-records"
        >
          <svg
            class="w-10 h-10 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div class="mx-auto text-center">Patient Records</div>
        </NuxtLink>
        <NuxtLink
          class="bg-gradient-to-br from-sky-700 to-teal-500/40 text-white max-w-xs hover:bg-teal-500 transition duration-200 h-40 block py-10 p-16 items-center justify-center text-xl rounded-2xl"
          to="/admin/schedules"
        >
          <svg
            class="w-10 h-10 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div class="mx-auto text-center">Schedules</div>
        </NuxtLink>
        <NuxtLink
          class="bg-gradient-to-br from-sky-700 to-teal-500/40 text-white max-w-xs hover:bg-teal-500 transition duration-200 h-40 block py-10 p-16 items-center justify-center text-xl rounded-2xl"
          to="/admin/notifications"
        >
          <svg
            class="w-10 h-10 mx-auto"
            fill=" currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            ></path>
          </svg>
          <div class="mx-auto text-center">Notifications</div>
        </NuxtLink>
      </div>
      <!-- Schedules-->
      <div
        class="pt-4 md:pt-12 pb-16 md:pb-0 lg:pt-0 grid grid-rows-[auto] px-2 md:px-12"
      >
        <div
          class="max-w-xs mt-auto mx-auto w-full border border-teal-500 rounded-xl"
        >
          <div class="pl-6 pr-3 pt-3 flex justify-between">
            <div>Reminders</div>
            <button
              v-if="isEditing"
              class="px-4 text-sm border border-teal-500 hover:bg-teal-400 hover:text-white transition duration-200 rounded-xl"
              @click="onSave()"
            >
              Save
            </button>
            <button
              v-else
              class="px-4 text-sm border border-teal-500 hover:bg-teal-400 hover:text-white transition duration-200 rounded-xl"
              @click="onEdit()"
            >
              Edit
            </button>
          </div>
          <div class="h-40 p-2 w-full">
            <textarea
              v-if="isEditing"
              v-model="reminders.message"
              class="text-sm h-full w-full border border-sky-400 rounded-b-lg px-2 py-1 resize-none"
            ></textarea>
            <div
              v-else
              class="text-sm h-full w-full border border-gray-400 rounded-b-lg px-2 py-1 resize-none"
            >
              {{ reminders.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div v-show="showReminders">
      <SimpleModalDialog>
        <template #header>
          <div class="font-medium mb-3">Reminders:</div>
        </template>
        <template #body>
          <div class="w-[min(100vw_-_6rem,_24rem)] mb-6">
            {{ reminders.message }}
          </div>
        </template>
        <template #actions>
          <div class="flex justify-end">
            <button
              type="submit"
              class="px-4 py-1 border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium rounded-full"
              @click="showReminders = false"
            >
              OK
            </button>
          </div>
        </template>
      </SimpleModalDialog>
    </div>
  </transition>
</template>
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 1s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 1s ease;
}
</style>
