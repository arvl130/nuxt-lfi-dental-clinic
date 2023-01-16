<script setup>
import { useRouter } from "vue-router"
import { signOut } from "~/utils/auth/session"
import { useProfilePictureStore } from "~/stores/profilePicture"
import { useUserFullnameStore } from "~/stores/userFullname"
import { useAuthStore } from "~/stores/auth"
import { storeToRefs } from "pinia"

const router = useRouter()
const onLogout = async () => {
  await signOut()
  router.push("/login")
}

const { currentUser } = storeToRefs(useAuthStore())
const profilePictureStore = useProfilePictureStore()
const userFullnameStore = useUserFullnameStore()

watchEffect(async () => {
  if (currentUser.value && !profilePictureStore.isInitialized)
    await profilePictureStore.initialize()
  if (currentUser.value && !userFullnameStore.isInitialized)
    await userFullnameStore.initialize()
})
</script>

<template>
  <!-- SIDEBAR -->
  <div
    class="admin-view-sidebar bg-teal-500/40 text-sky-700 h-full md:grid grid-rows-[auto_1fr] xst:hidden xs:pt-20 lg:pt-10 md:pt-5 md:w-20 lg:w-64 sm:hidden xs:hidden"
  >
    <!-- image -->
    <div class="flex flex-col items-center py-6">
      <img
        :src="profilePictureStore.getDownloadURL"
        alt="Profile Picture"
        class="object-cover mb-1 rounded-full md:h-16 md:w-16 lg:h-24 lg:w-24"
        v-if="profilePictureStore.getDownloadURL"
      />
      <img
        src="~/assets/img/nav-person.png"
        alt="Profile Picture"
        class="object-cover mb-1 rounded-full md:h-16 md:w-16 lg:h-24 lg:w-24"
        v-else
      />
      <span class="md:hidden lg:block">{{
        userFullnameStore.getFullname
      }}</span>
    </div>
    <!-- Nav items -->
    <div class="flex flex-col">
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin"
      >
        <svg
          class="w-6 h-6 mr-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          ></path>
        </svg>
        <span class="md:hidden lg:block">Home</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/schedules"
      >
        <svg
          class="w-6 h-6 mr-5"
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
        <span class="md:hidden lg:block">Schedules</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/appointments"
      >
        <svg
          class="w-6 h-6 mr-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          ></path>
        </svg>
        <span class="md:hidden lg:block">Appointments</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/patient-records"
      >
        <svg
          class="w-6 h-6 mr-5"
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
        <span class="md:hidden lg:block">Patient Records</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/notifications"
      >
        <svg
          class="w-6 h-6 mr-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
          ></path>
        </svg>
        <span class="md:hidden lg:block">Notifications</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/messages"
      >
        <svg
          class="w-6 h-6 mr-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
          ></path>
          <path
            d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
          ></path>
        </svg>
        <span class="md:hidden lg:block">Messages</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 md:w-20 lg:w-64"
        to="/admin/account-settings"
      >
        <svg
          class="w-6 h-6 mr-5"
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
        <span class="md:hidden lg:block">Account Settings</span>
      </NuxtLink>
      <button
        class="flex items-center px-8 py-3 md:py-5 lg:py-3 transition duration-200 hover:bg-teal-500/40 lg:mt-auto md:w-20 lg:w-64"
        @click="onLogout()"
      >
        <svg
          class="w-6 h-6 mr-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="md:hidden lg:block">Log out</span>
      </button>
    </div>
  </div>

  <!-- fixed nav -->
  <nav
    class="fixed bottom-0 z-50 inset-x-0 bg-gradient-to-br from-teal-500 to-sky-700 flex justify-between text-sm text-white uppercase font-mono md:hidden"
  >
    <NuxtLink
      class="w-full block py-5 px-3 text-center hover:bg-teal-500/40 hover:text-sky-700 transition duration-300"
      to="/admin"
    >
      <svg
        class="w-6 h-6 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        ></path>
      </svg>
      <!--Home-->
    </NuxtLink>
    <NuxtLink
      class="w-full block py-5 px-3 text-center hover:bg-teal-500/40 hover:text-sky-700 transition duration-300"
      to="/admin/schedules"
    >
      <svg
        class="w-6 h-6 mx-auto"
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
      <!--Schedules-->
    </NuxtLink>
    <NuxtLink
      class="w-full block py-5 px-3 text-center hover:bg-teal-500/40 hover:text-sky-700 transition duration-300"
      to="/admin/appointments"
    >
      <svg
        class="w-6 h-6 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
        ></path>
      </svg>
      <!--appointments-->
    </NuxtLink>

    <NuxtLink
      class="w-full block py-5 px-3 text-center hover:bg-teal-500/40 hover:text-sky-700"
      to="/admin/patient-records"
    >
      <svg
        class="w-6 h-6 mx-auto"
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
      <!--Patient Records-->
    </NuxtLink>
    <NuxtLink
      class="w-full block py-5 px-3 text-center hover:bg-teal-500/40 hover:text-sky-700"
      to="/admin/messages"
    >
      <svg
        class="w-6 h-6 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
        ></path>
        <path
          d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
        ></path>
      </svg>
      <!--Messages-->
    </NuxtLink>
  </nav>
</template>
<style>
.admin-view-sidebar .router-link-exact-active {
  @apply bg-teal-500/40;
}
</style>
