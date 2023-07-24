<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
useHead({
  title: "Prosthodontics \u2013 LFI Dental Clinic",
})
</script>

<template>
  <HeroSection>Dental Services</HeroSection>
  <!-- Page title -->
  <section class="bg-teal-500 py-3">
    <h3 class="font-bold text-3xl text-white text-center">Prosthodontics</h3>
  </section>
  <!-- Main content -->
  <section>
    <div class="max-w-6xl mx-auto px-6 py-24">
      <article
        id="complete-denture"
        class="grid md:grid-cols-2 max-w-4xl mx-auto mb-24"
      >
        <div class="mb-6 md:mb-0">
          <img
            src="~/assets/img/dental-services/complete-denture.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
        <div class="flex flex-col justify-center text-justify md:pr-12">
          <h4 class="text-2xl font-bold mb-3">Complete Denture</h4>
          <p class="mb-3">
            A full-coverage oral prosthetic devices that replace a complete arch
            of missing teeth. It is a removable appliance used when all teeth
            within a jaw have been lost and need to be prosthetically replaced.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Complete Denture' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
      </article>
      <article
        id="partial-denture"
        class="grid md:grid-cols-2 max-w-4xl mx-auto mb-24"
      >
        <div class="flex flex-col justify-center text-justify md:pl-12">
          <h4 class="text-2xl font-bold mb-3">Partial Denture</h4>
          <p class="mb-3">
            This denture is an oral prosthetic device that replace some of
            missing teeth. This is also removable denture.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Partial Denture' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
        <div class="mt-6 md:mt-0">
          <img
            src="~/assets/img/dental-services/partial-denture.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
      </article>
      <article
        id="jacket-crown"
        class="grid md:grid-cols-2 max-w-4xl mx-auto mb-24"
      >
        <div class="mb-6 md:mb-0">
          <img
            src="~/assets/img/dental-services/jacket-crown.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
        <div class="flex flex-col justify-center text-justify md:pr-12">
          <h4 class="text-2xl font-bold mb-3">Jacket Crown</h4>
          <p class="mb-3">
            A full porcelain ceramic covered crown which is used to protect the
            entire surface of a tooth. Crowns are an ideal way to rebuild teeth
            which have been broken or weakened by decay or large fillings.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Jacket Crown' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
      </article>
      <article id="fixed-bridge" class="grid md:grid-cols-2 max-w-4xl mx-auto">
        <div class="flex flex-col justify-center text-justify md:pl-12">
          <h4 class="text-2xl font-bold mb-3">Fixed Bridge</h4>
          <p class="mb-3">
            a partial denture that is secured permanently in the mouth by being
            cemented to the adjacent teeth or roots.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Fixed Bridge' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
        <div class="mt-6 md:mt-0">
          <img
            src="~/assets/img/dental-services/fixed-bridge.png"
            class="mx-auto w-full max-w-xs"
          />
        </div>
      </article>
    </div>
  </section>
</template>
