<template>
  <div
    class="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <h5 class="mt-5 mb-5 text-5xl font-bold text-center text-sky-700">
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
</template>
