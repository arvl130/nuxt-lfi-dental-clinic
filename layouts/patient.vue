<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth"

const { isLoading, isAuthenticated, currentUser } = storeToRefs(useAuthStore())
const router = useRouter()

const userRole = ref("")

watchEffect(async () => {
  if (!isLoading.value) {
    if (!isAuthenticated.value) {
      router.push("/login")
      return
    }

    const {
      claims: { accountType },
    } = await currentUser.value.getIdTokenResult()

    if (accountType !== "patient") {
      router.push("/login")
      return
    }

    userRole.value = accountType
  }
})
</script>

<template>
  <div
    class="grid grid-rows-[auto_1fr_auto] min-h-screen text-sky-600 font-[Poppins]"
  >
    <NavBar />
    <main v-if="!isLoading && userRole === 'patient'">
      <slot></slot>
    </main>
    <main v-else class="flex justify-center items-center">Loading ...</main>

    <FooterSection v-if="!isLoading && userRole === 'patient'" />
  </div>
</template>
