<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import AccountSettings from "~/components/shared/AccountSettings.vue"

definePageMeta({
  layout: "patient",
})

useHead({
  title: "Account Settings \u2013 LFI Dental Clinic",
})
</script>
<template>
  <HeroSection>My Account</HeroSection>
  <AccountSettings />
</template>
