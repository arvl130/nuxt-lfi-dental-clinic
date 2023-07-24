<script setup>
import heroImage from "~/assets/img/about/bg-about.png"

useHead({
  title: "About \u2013 LFI Dental Clinic",
})
</script>
<template>
  <!-- Hero section -->
  <section
    class="h-[30vh] md:h-[40vh] lg:h-[50vh] flex justify-center items-center bg-cover bg-center"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <h3 class="text-5xl font-bold text-center text-white">ABOUT US</h3>
  </section>

  <!-- History section -->
  <section class="max-w-6xl mx-auto px-6 py-16">
    <div class="max-w-fit mx-auto">
      <h3 class="font-bold text-center text-3xl mb-3">History</h3>
      <div class="max-w-3xl text-justify">
        <p class="mb-3">
          Dr. Lani F. Isidro earned her bachelor's degree in 1989 from Manila
          Central University. Coming from a family of doctors, she passed her
          licensure exam in 1991. Her desire to help others through her degree
          was her inspiration in opening her first dental clinic in Monserrat
          Morning Breeze with the support of her older sister, optometrist Dr.
          Lota Fragante.
        </p>
        <p class="mb-3">
          In 1997, she chose to relocate her dental practice to their home at
          Dolmar Golden Hills, Novaliches, Caloocan City so that she could
          fulfill her lifelong dream of being a dentist and a mother.
        </p>
        <p class="mb-3">
          After 14 years, the Lord prompted her to relocate her dentistry
          business to Jordan Plains, Novaliches, Quezon City, beside Jesus
          Amazing Grace Church where she was appointed as a full pledge pastor.
          Serving not just the patient's toothache but also leading and helping
          others to know Christ more.
        </p>
        <p>
          In 2010, she studied orthodontics at Prime Orthodontics Studies and
          Training Philippines, Inc.
        </p>
      </div>
    </div>
  </section>

  <!-- Staff section -->
  <section class="px-6 py-12 bg-teal-500/40">
    <div class="hidden xl:block max-w-6xl mx-auto">
      <div class="grid grid-cols-[auto_1fr_auto]">
        <div>
          <img
            src="~/assets/img/about/dr-mother.png"
            alt="Dr. Lani"
            class="max-w-[19rem]"
          />
        </div>
        <div class="px-6">
          <h3 class="text-3xl text-center font-bold mb-12">
            Meet our Dentists
          </h3>
          <div class="mb-12 text-xl">
            <p class="font-bold">Dr. Lani Isidro</p>
            <p>Founder of LFI Dental Clinic</p>
          </div>
          <div class="text-right text-xl">
            <p class="font-bold">Dr. Laarni Isidro</p>
            <p>Daughter of Dr. Lani Isidro</p>
          </div>
        </div>
        <div>
          <img
            src="~/assets/img/about/laarni.png"
            alt="Dr. Laarni"
            class="max-w-[19rem]"
          />
        </div>
      </div>
    </div>
    <!-- Mobile version -->
    <div class="xl:hidden max-w-6xl mx-auto">
      <h3 class="text-3xl text-center font-bold mb-6">Meet our Dentists</h3>
      <div class="grid grid-cols-2 mb-6">
        <img
          src="~/assets/img/about/dr-mother.png"
          alt="Dr. Lani"
          class="max-w-[19rem] w-full ml-auto"
        />
        <div class="flex flex-col justify-center px-6">
          <p class="font-bold text-xl">Dr. Lani Isidro</p>
          <p>Founder of LFI Dental Clinic</p>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="flex flex-col justify-center px-6 text-right">
          <p class="font-bold text-xl">Dr. Laarni Isidro</p>
          <p>Dr. Laarni Isidro</p>
        </div>
        <img
          src="~/assets/img/about/laarni.png"
          alt="Dr. Lani"
          class="max-w-[19rem] w-full"
        />
      </div>
    </div>
  </section>

  <!-- Mission & Vision section -->
  <section>
    <div class="max-w-6xl mx-auto px-6 py-24">
      <!-- Mission -->
      <article class="grid md:grid-cols-2 mb-16">
        <div>
          <img
            src="~/assets/img/about/IMG_2123.png.png"
            alt="Our Mission"
            class="hidden md:block max-w-md w-full mx-auto"
          />
        </div>
        <div class="md:pl-6 text-center flex flex-col justify-center">
          <h3 class="text-3xl font-bold mb-3">Our Mission</h3>
          <p>
            To be committed to excellence in all of our services to our patient
            so that we may help them achieve the highest level of dental health
            treatment appropriate for their needs in comfort, trust and
            understanding at an affordable price.
          </p>
        </div>
      </article>
      <!-- Vision -->
      <article class="grid md:grid-cols-2">
        <div class="md:pr-6 text-center flex flex-col justify-center">
          <h3 class="text-3xl font-bold mb-3">Our Vision</h3>
          <p>
            Our vision is to treat patient's dental needs and have access to
            high quality level of care, skill, judgment and comfort with
            affordable dental treatment to improve their overall health. And
            serving not just the patient's dental needs but also leading and
            helping others to know Christ more.
          </p>
        </div>
        <div>
          <img
            src="~/assets/img/about/IMG_2112.png.png"
            alt="Our Mission"
            class="hidden md:block max-w-md w-full mx-auto"
          />
        </div>
      </article>
    </div>
  </section>
</template>
