<template>
  <div class="border border-teal-500 rounded-xl">
    <!-- Days -->
    <div class="grid grid-cols-[repeat(7,_minmax(0,_5rem))] md:gap-2 pt-4 px-4">
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Sun
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Mon
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Tue
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Wed
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Thu
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Fri
      </div>
      <div
        class="text-center text-ellipsis overflow-hidden border border-teal-500"
      >
        Sat
      </div>
    </div>
    <!-- Dates -->
    <div
      class="grid grid-cols-[repeat(7,_minmax(0,_5rem))] md:gap-2 p-4 md:auto-rows-[4rem]"
    >
      <slot></slot>
    </div>
  </div>
</template>
