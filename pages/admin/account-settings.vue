<script setup>
import AccountSettings from "~/components/shared/AccountSettings.vue"
definePageMeta({ layout: "admin" })
</script>
<template>
  <AccountSettings />
  <button
    class="flex items-center px-8 py-3 mx-auto border-2 rounded-lg border-teal-500 transition duration-200 hover:bg-teal-500/40 lg:mt-auto md:w-20 lg:w-64 lg:hidden md:hidden"
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
    <span class="md:hidden lg:block items-center">Log out</span>
  </button>
</template>
