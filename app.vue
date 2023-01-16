<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { useAuthStore } from "~/stores/auth"

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  title: "LFI Dental Clinic",
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
