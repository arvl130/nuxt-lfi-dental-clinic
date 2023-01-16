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

    if (accountType !== "admin") {
      router.push("/login")
      return
    }

    userRole.value = accountType
  }
})
</script>

<template>
  <div class="grid grid-rows-[minmax(100vh,_1fr)_auto] min-h-screen">
    <div
      class="grid grid-cols-[auto_1fr]"
      v-if="!isLoading && userRole === 'admin'"
    >
      <div>
        <AdminSidebar />
      </div>
      <main class="p-6 text-sky-600 font-[Poppins] overflow-hidden">
        <slot></slot>
      </main>
    </div>
    <div
      v-else
      class="flex justify-center items-center text-sky-600 font-[Poppins]"
    >
      Loading ...
    </div>
    <FooterSection v-if="!isLoading && userRole === 'admin'" />
  </div>
</template>
