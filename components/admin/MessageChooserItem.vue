<script setup>
const props = defineProps({
  message: Object,
})

const emit = defineEmits(["itemClicked", "itemArchived"])

const onArchive = () => {
  emit("itemArchived", props.message.uid)
}

function formattedDate(unixSecs) {
  const date = new Date(unixSecs * 1000)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return `${hours}:${minutes} ${month}/${day}/${year}`
}
</script>

<template>
  <div
    class="flex justify-between items-center px-3 py-2 hover:bg-gray-200 transition"
    :class="{ 'bg-gray-100': props.message.clicked }"
    @click="emit('itemClicked', message.uid)"
  >
    <div>
      <div class="font-medium">{{ message.senderName }}</div>
      <div class="text-sm sm:hidden">
        {{ formattedDate(message.createdAtUnixSecs) }}
      </div>
    </div>
    <div class="flex gap-4 items-center">
      <div class="hidden sm:block">
        {{ formattedDate(message.createdAtUnixSecs) }}
      </div>
      <button
        v-if="message.isArchived"
        class="px-3 py-1 border text-sm border-teal-500 hover:bg-teal-400 hover:text-white transition duration-200 rounded-3xl"
        @click.stop="onArchive"
      >
        Unarchive
      </button>
      <button
        v-else
        class="px-3 py-1 border text-sm border-teal-500 hover:bg-teal-400 hover:text-white transition duration-200 rounded-3xl"
        @click.stop="onArchive"
      >
        Archive
      </button>
    </div>
  </div>
</template>
