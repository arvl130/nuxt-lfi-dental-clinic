<script setup lang="ts">
useHead({
  title: "LFI Dental Clinic",
})
</script>
<style>
.homepage-hero-section:after {
  content: "";
  background-color: black;
  opacity: 75%;
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -1;
}
</style>
<template>
  <div
    class="homepage-hero-section relative bg-cover bg-no-repeat bg-center h-[90vh]"
  >
    <img
      src="~/assets/img/bgs/bg2.jpg"
      alt="Girl smiling"
      class="-z-[1] absolute w-full h-full object-cover object-[-5rem_0px] sm:object-center"
    />
    <div
      class="flex flex-col absolute w-full h-full justify-end items-center pb-20 md:pb-0 md:justify-center md:items-end md:pr-24"
    >
      <h2
        class="text-2xl text-center md:text-4xl md:text-right font-bold px-6 md:px-0"
      >
        Get an <span class="text-teal-500">Appointment</span> Now!
      </h2>
      <p class="md:text-right">Don't let your agony set it for you.</p>
      <NuxtLink to="/appointments">
        <button
          class="bg-transparent text-teal-500 font-bold hover:text-white py-2 px-4 my-4 border-2 border-teal-500 rounded inline-flex items-center md:float-right hover:bg-teal-500 hover:border-teal-500 transition-all ease-in duration-75"
        >
          <span>Get Started!</span>
          <svg
            class="ml-2 w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </NuxtLink>
    </div>
  </div>

  <!-- ====== Services Section Start -->
  <div
    id="services"
    class="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <h5
      class="mt-5 mb-5 text-3xl md:text-5xl font-bold text-center text-sky-700"
    >
      OUR SERVICES
    </h5>
    <div class="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink to="/services/general-dentistry">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/general_dentistry.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">
              GENERAL DENTISTRY
            </h1>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/services/cosmetic-surgery">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/cosmetic_dentistry.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">
              COSMETICS SURGERY
            </h1>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/services/oral-surgery">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/oral_surgery.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">ORAL SURGERY</h1>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/services/orthodontics">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/orthodontics.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">ORTHODONTICS</h1>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/services/pediatric-dentistry">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/pediatric_dentistry.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">
              PEDIATRIC DENTISTRY
            </h1>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/services/prosthodontics">
        <div class="p-8">
          <div class="max-w-md text-center">
            <div
              class="flex items-center justify-center w-40 h-40 mx-auto mb-10 transition-colors duration-200 ease-in-out bg-teal-100 rounded-full hover:bg-teal-300 sm:w-40 sm:h-40 hover:scale-110"
            >
              <img src="~/assets/img/services/prosthodontics.ico" />
            </div>
            <h1 class="mb-2 text-2xl font-semibold leading-5">
              PROSTHODONTICS
            </h1>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
  <!-- ====== Services Section End -->

  <!--- Start of Frequently Asked Questions -->
  <section>
    <div class="z-20 w-full bg-gradient-to-br from-teal-500 to-sky-700">
      <div class="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8 faqs">
        <h5 class="mb-10 text-3xl md:text-5xl font-bold text-center text-white">
          FREQUENTLY ASKED QUESTIONS
        </h5>

        <blockquote
          class="p-8 transition-colors duration-200 ease-in-out bg-white rounded shadow-lg hover:bg-gray-200"
        >
          <div class="flex items-center">
            <div class="ml-4 text-sm">
              <p class="font-medium">
                Do I need to arrive early for my first appointment?
              </p>
            </div>
          </div>

          <p class="mt-4 text-gray-500">
            <span class="text-xl">&ldquo;</span>
            Yes, at least 15 minutes early to fill out essential paperwork and
            give the staff time to get you all set up.
            <span class="text-xl">&rdquo;</span>
          </p>
        </blockquote>

        <blockquote
          class="p-8 mt-4 transition-colors duration-200 ease-in-out bg-white rounded shadow-lg hover:bg-gray-200"
        >
          <div class="flex items-center">
            <div class="ml-4 text-sm">
              <p class="font-medium">What are early signs of dental trouble?</p>
            </div>
          </div>
          <p class="mt-4 text-gray-500">
            <span class="text-xl">&ldquo;</span>
            The possible early signs of dental trouble are: Toothache; Sensitive
            Teeth; Bleeding or Sore Gums; Bad Breath; Cavities; Jaw Pain; Mouth
            Sores; Dry Mouth; Broken, Cracked, Chipped, Lost.
            <span class="text-xl">&rdquo;</span>
          </p>
        </blockquote>

        <blockquote
          class="p-8 mt-4 transition-colors duration-200 ease-in-out bg-white rounded shadow-lg hover:bg-gray-200"
        >
          <div class="flex items-center">
            <div class="ml-4 text-sm">
              <p class="font-medium">What are early signs of dental trouble?</p>
            </div>
          </div>
          <p class="mt-4 text-gray-500">
            <span class="text-xl">&ldquo;</span>
            The possible early signs of dental trouble are: Toothache; Sensitive
            Teeth; Bleeding or Sore Gums; Bad Breath; Cavities; Jaw Pain; Mouth
            Sores; Dry Mouth; Broken, Cracked, Chipped, Lost.
            <span class="text-xl">&rdquo;</span>
          </p>
        </blockquote>

        <div class="flex justify-center">
          <NuxtLink
            to="/faqs"
            class="w-56 px-4 py-4 mt-10 text-center transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-sky-500 hover:text-white text-sky-700 rounded-md duration-300 ..."
          >
            <button>View More</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <!-- End of Frequently Asked Questions -->

  <!-- Start of Instructions -->
  <div
    class="sm:px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div class="text-center">
        <p
          class="inline-block px-3 py-px mb-4 text-sm font-semibold tracking-wider uppercase rounded-full text-sky-700 bg-teal-accent-400"
        >
          LFI DENTAL CLINIC
        </p>
      </div>
      <h2
        class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-center text-teal-500 sm:text-4xl md:mx-auto"
      >
        <span class="relative inline-block">
          <svg
            viewBox="0 0 52 24"
            fill="currentColor"
            class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
          >
            <defs>
              <pattern
                id="f51618fb-0edb-4bcb-b35a-ffc770941286"
                x="0"
                y="0"
                width=".135"
                height=".30"
              >
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect
              fill="url(#f51618fb-0edb-4bcb-b35a-ffc770941286)"
              width="52"
              height="24"
            ></rect>
          </svg>
          <span class="relative text-sky-700">HOW</span>
        </span>
        TO SET AN APPOINTMENT
      </h2>
      <p class="text-base text-center teal-5 md:text-lg">
        Set your appointment now through these three (3) easy steps.
      </p>
    </div>
    <div class="grid gap-8 row-gap-0 lg:grid-cols-3 px-6">
      <div class="relative text-center">
        <div
          class="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors duration-200 ease-in-out bg-gray-100 rounded-full hover:bg-teal-300 sm:w-20 sm:h-20 hover:scale-110 hover:rounded-full"
        >
          <NuxtLink
            to="/appointments"
            class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
            ><h1 class="text-6xl">1</h1>
          </NuxtLink>
        </div>
        <h6 class="mb-2 text-2xl font-extrabold">Choose a date.</h6>
        <p class="max-w-md mb-3 text-sm text-sky-700 sm:mx-auto">
          Go the
          <NuxtLink to="/appointments" class="border-b border-sky-700"
            >Set an Appointment</NuxtLink
          >
          page. Choose and select your preferred date and time. Then, specify
          the needed service.
        </p>
        <NuxtLink
          to="/appointments"
          class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
          >View our Schedules
        </NuxtLink>
        <div
          class="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute"
        >
          <svg
            class="w-8 text-teal-500 transform rotate-90 lg:rotate-0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <line
              fill="none"
              stroke-miterlimit="10"
              x1="2"
              y1="12"
              x2="22"
              y2="12"
            ></line>
            <polyline
              fill="none"
              stroke-miterlimit="10"
              points="15,5 22,12 15,19 "
            ></polyline>
          </svg>
        </div>
      </div>
      <div class="relative text-center">
        <div
          class="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors duration-200 ease-in-out bg-gray-100 rounded-full hover:bg-teal-300 sm:w-20 sm:h-20 hover:scale-110 hover:rounded-full"
        >
          <NuxtLink
            to="/appointments"
            class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
            ><h1 class="text-6xl">2</h1>
          </NuxtLink>
        </div>
        <h6 class="mb-2 text-2xl font-extrabold">Create your Account.</h6>
        <p class="max-w-md mb-3 text-sm text-sky-700 sm:mx-auto">
          Create an account or
          <NuxtLink to="/login" class="border-b border-sky-700"
            >Sign in</NuxtLink
          >
          with an existing account.
        </p>
        <NuxtLink
          to="/login"
          class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
          >Login or Sign up
        </NuxtLink>
        <div
          class="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute"
        >
          <svg
            class="w-8 text-teal-500 transform rotate-90 lg:rotate-0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <line
              fill="none"
              stroke-miterlimit="10"
              x1="2"
              y1="12"
              x2="22"
              y2="12"
            ></line>
            <polyline
              fill="none"
              stroke-miterlimit="10"
              points="15,5 22,12 15,19 "
            ></polyline>
          </svg>
        </div>
      </div>
      <div class="relative text-center">
        <div
          class="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors duration-200 ease-in-out bg-gray-100 rounded-full hover:bg-teal-300 sm:w-20 sm:h-20 hover:scale-110 hover:rounded-full"
        >
          <NuxtLink
            to="/patient/history"
            class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
            ><h1 class="text-6xl">3</h1>
          </NuxtLink>
        </div>
        <h6 class="mb-2 text-2xl font-extrabold">Done.</h6>
        <p class="max-w-md mb-3 text-sm text-sky-700 sm:mx-auto">
          View your scheduled appointments in the
          <NuxtLink to="/patient/history" class="border-b border-sky-700">
            My Appointments</NuxtLink
          >
          page.
        </p>
        <NuxtLink
          to="/patient/history"
          class="inline-flex items-center font-semibold transition-colors duration-200 ease-in-out text-deep-purple-accent-400 hover:text-teal-500 hover:scale-110"
          >See your Appointments
        </NuxtLink>
      </div>
    </div>
  </div>
  <!--- End of Instructions -->
</template>
