<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { useAuthStore } from "~/stores/auth"

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
})

useSeoMeta({
  description:
    "Experience exceptional and affordable dental care at LFI Dental Clinic. Trustworthy services dedicated to improving your dental health. Visit us in Jordan Plains Subd., Novaliches, Quezon City.",
})

const currentUserStore = useAuthStore()
const unsubscribe = ref(null)

onMounted(() => {
  const auth = getAuth()
  unsubscribe.value = onAuthStateChanged(auth, (user) => {
    currentUserStore.setUser(user)
  })
})

onUnmounted(() => {
  if (unsubscribe.value) unsubscribe.value()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
