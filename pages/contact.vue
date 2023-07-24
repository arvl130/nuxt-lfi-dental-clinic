<script setup>
import { computed, reactive, ref } from "vue"
import { createMessage } from "~/utils//api/Messages"
import HeroSection from "~/components/patient/HeroSection.vue"

useHead({
  title: "Contact Us \u2013 LFI Dental Clinic",
})

const message = reactive({
  senderName: "",
  email: "",
  body: "",
})

const messageIsSending = ref(false)
const isSendButtonDisabled = computed(() => {
  if (messageIsSending.value) return true
  if (message.senderName === "") return true
  if (message.email === "") return true
  if (message.body === "") return true
  return false
})

const onSendButton = async () => {
  if (!isSendButtonDisabled.value) {
    messageIsSending.value = true
    await createMessage(message)
    messageIsSending.value = false
    message.senderName = ""
    message.email = ""
    message.body = ""
  }
}
</script>
<template>
  <HeroSection>Contact Us</HeroSection>
  <div
    class="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto text-gray-900"
  >
    <div class="flex flex-col justify-between">
      <div>
        <h2 class="text-4xl lg:text-5xl font-bold leading-tight text-sky-700">
          Get in Touch
        </h2>
        <div class="text-sky-700 mt-3 font-semibold">
          <span class="text-teal-500 font-bold">Address: </span>2305 Salvador
          Ave. Jordan Plaines Phase 1 Subdivision, Brgy. Sta. Monica,
          Novaliches, Quezon City
        </div>
        <div class="text-sky-700 mt-4 mb-5 font-semibold">
          <span class="text-teal-500 font-bold">Mobile: </span>
          (+63) 928 463 2914 <br />
          <span class="text-teal-500 font-bold">Landline: </span>
          (+63) 28 579 9537
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d286.8076344268989!2d121.04312885570937!3d14.723433981933423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0f84eb18371%3A0x894844ab192dd95b!2s2305%20Jordan%20Subd.%2C%20Novaliches%2C%20Quezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1651031166862!5m2!1sen!2sph"
          class="border-2 border-sky-700 rounded-lg w-full"
          width="450"
          height="325"
          style=""
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="shadow-lg rounded-lg p-6 border-2 border-sky-700">
      <div>
        <h2
          class="text-4xl lg:text-5xl font-bold leading-tight text-sky-700 mb-5"
        >
          Send Message
        </h2>

        <input
          class="w-full bg-gray-100 text-sky-700 mt-2 border-2 border-sky-700 p-3 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
          type="text"
          placeholder="Name *"
          :class="{
            'bg-gray-300': messageIsSending,
            'pointer-events-none': messageIsSending,
          }"
          v-model="message.senderName"
        />
      </div>
      <div class="mt-8">
        <input
          class="w-full bg-gray-100 text-sky-700 mt-2 border-2 border-sky-700 p-3 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
          type="text"
          placeholder="Email *"
          :class="{
            'bg-gray-300': messageIsSending,
            'pointer-events-none': messageIsSending,
          }"
          v-model="message.email"
        />
      </div>
      <div class="mt-8">
        <textarea
          class="w-full h-32 min-h-32 bg-gray-100 text-sky-700 mt-2 border-2 border-sky-700 p-3 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          placeholder="Message *"
          :class="{
            'bg-gray-300': messageIsSending,
            'pointer-events-none': messageIsSending,
          }"
          v-model="message.body"
        ></textarea>
      </div>
      <div class="mt-8">
        <button
          class="uppercase text-sm font-bold tracking-wide bg-sky-700 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:bg-sky-500 transition duration-100"
          :class="{
            'bg-sky-300': isSendButtonDisabled,
            'pointer-events-none': isSendButtonDisabled,
          }"
          @click="onSendButton()"
        >
          <span v-if="messageIsSending">Sending</span>
          <span v-else>Send</span>
        </button>
      </div>
    </div>
  </div>
</template>
