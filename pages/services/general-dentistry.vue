<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
useHead({
  title: "General Dentistry \u2013 LFI Dental Clinic",
})
</script>

<template>
  <HeroSection>Dental Services</HeroSection>
  <!-- Page title -->
  <section class="bg-teal-500 py-3">
    <h3 class="font-bold text-3xl text-white text-center">General Dentistry</h3>
  </section>
  <section>
    <div class="max-w-6xl mx-auto px-6 py-24">
      <article
        id="oral-prophylaxis"
        class="grid md:grid-cols-2 max-w-prose mx-auto mb-24"
      >
        <div class="mb-6 md:mb-0">
          <img
            src="~/assets/img/dental-services/oral-prophylaxis.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
        <div class="flex flex-col justify-center text-center md:pl-6">
          <h4 class="text-2xl font-bold mb-3">Oral Prophylaxis</h4>
          <p class="mb-3">
            A thorough examination of your oral health combined with a scale and
            clean and can be conducted by a dentist or a dental hygienist.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Oral Prophylaxis' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
      </article>
      <article
        id="tooth-restoration"
        class="grid md:grid-cols-2 max-w-prose mx-auto"
      >
        <div class="flex flex-col justify-center text-center md:pr-6">
          <h4 class="text-2xl font-bold mb-3">Tooth Restoration</h4>
          <p class="mb-3">
            This can help you get your teeth back to their original function
            while also preventing further decay.
          </p>
          <div class="mb-6 md:mb-0">
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Tooth Restoration' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
        <div>
          <img
            src="~/assets/img/dental-services/tooth-restoration.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
      </article>
    </div>
  </section>
</template>
