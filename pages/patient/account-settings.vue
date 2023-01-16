<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import AccountSettings from "~/components/shared/AccountSettings.vue"

definePageMeta({
  layout: "patient",
})
</script>
<template>
  <HeroSection>My Account</HeroSection>
  <AccountSettings />
</template>
