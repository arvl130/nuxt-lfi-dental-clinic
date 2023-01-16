<template>
  <div
    class="flex items-center justify-center w-full h-screen bg-gradient-to-r from-teal-500 to-sky-700"
  >
    <div class="px-40 py-20 bg-white rounded-md shadow-xl">
      <div class="flex flex-col items-center">
        <h1
          class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-700 text-9xl"
        >
          404
        </h1>

        <h6
          class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
        >
          <span class="text-red-500">Oops!</span> Page not found.
        </h6>

        <p class="mb-8 text-center text-sky-700 md:text-lg">
          The page you are looking for could not be found. Sorry for the
          inconvenience.
        </p>

        <NuxtLink to="/">
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-sky-700 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110"
          >
            <span
              class="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
            >
              Go Back
            </span>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
