<template>
  <div class="grid gap-3 border border-teal-500 px-6 pt-3 pb-5 rounded-xl">
    <div>
      <div class="text-center mb-3">MORNING</div>
      <div class="grid grid-cols-2 sm:gap-4">
        <slot name="morning-slots"></slot>
      </div>
    </div>
    <div>
      <div class="text-center mb-3">AFTERNOON</div>
      <div class="grid grid-cols-2 sm:gap-4">
        <slot name="afternoon-slots"></slot>
      </div>
    </div>
  </div>
</template>
