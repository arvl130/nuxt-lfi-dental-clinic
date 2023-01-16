<template>
  <!-- backdrop -->
  <div class="fixed inset-0 bg-slate-900/30 flex justify-center items-center">
    <!-- Modal box -->
    <div
      class="max-w-prose mx-3 px-6 py-4 bg-white text-sky-600 font-[Poppins] rounded-lg shadow-md"
    >
      <div>
        <slot name="header"></slot>
      </div>
      <div>
        <slot name="body"></slot>
      </div>
      <div>
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
