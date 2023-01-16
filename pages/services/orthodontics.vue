<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
</script>

<template>
  <HeroSection>Dental Services</HeroSection>
  <!-- Page title -->
  <section class="bg-teal-500 py-3">
    <h3 class="font-bold text-3xl text-white text-center">Orthodontics</h3>
  </section>
  <!-- Main content -->
  <section>
    <div class="max-w-6xl mx-auto px-6 py-24">
      <article class="grid md:grid-cols-2 max-w-4xl mx-auto">
        <div class="mb-6 md:mb-0">
          <img
            src="~/assets/img/dental-services/orthodontic-braces.jpg"
            class="mx-auto w-full max-w-xs"
          />
        </div>
        <div class="flex flex-col justify-center text-justify md:pl-12">
          <h4 class="text-2xl font-bold mb-3">Orthodontic Braces</h4>
          <p class="mb-3">
            Devices used in orthodontics that align and straighten teeth and
            help position them with regard to a person's bite, while also aiming
            to improve dental health.
          </p>
          <div>
            <NuxtLink
              class="rounded-full px-3 py-1 uppercase border border-sky-600 hover:bg-sky-600 hover:text-white transition duration-200 font-medium"
              :to="{
                path: '/appointments',
                query: { service: 'Orthodontic Braces' },
              }"
            >
              Get this Service
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
