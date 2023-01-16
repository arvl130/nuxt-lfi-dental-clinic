<script setup>
import SimpleModalDialog from "../admin/SimpleModalDialog.vue"
</script>

<template>
  <SimpleModalDialog>
    <template #header>
      <div class="mb-1 text-2xl font-semibold text-zinc-700">
        <slot name="header"></slot>
      </div>
    </template>
    <template #body>
      <div class="mb-4">
        <slot name="body"></slot>
      </div>
    </template>
    <template #actions>
      <div class="flex justify-between">
        <slot name="actions"></slot>
      </div>
    </template>
  </SimpleModalDialog>
</template>
