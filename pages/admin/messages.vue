<script setup>
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query"
import MessageChooserItem from "~/components/admin/MessageChooserItem.vue"
import {
  toggleMessageArchiveStatus,
  getAllMessages,
} from "~/utils/api/Messages"
import ExternalArrowIcon from "~/components/icons/ExternalArrowIcon.vue"

definePageMeta({ layout: "admin" })

const { data, isLoading } = useQuery({
  queryKey: ["messagesList"],
  queryFn: getAllMessages,
})

const selectedTab = ref("inbox")
const selectedItemUid = ref("")

const onSelectTab = (tab) => {
  selectedItemUid.value = ""
  selectedTab.value = tab
}

const selectedItem = computed(() => {
  const itemFound = data.value.find(
    (message) => selectedItemUid.value === message.uid
  )

  if (!itemFound)
    return {
      body: "",
      email: "",
    }

  return itemFound
})

const messageItems = computed(() => {
  if (!data.value) return []

  const messages = data.value.map(
    ({ uid, senderName, email, body, createdAt, isArchived }) => {
      return {
        uid,
        senderName,
        email,
        body,
        createdAtUnixSecs: createdAt._seconds,
        isArchived,
        clicked: selectedItemUid.value === uid ? true : false,
      }
    }
  )

  const filteredMessages =
    selectedTab.value === "archived"
      ? messages.filter(({ isArchived }) => isArchived)
      : messages.filter(({ isArchived }) => !isArchived)

  return filteredMessages.sort((a, b) => {
    if (a.createdAtUnixSecs < b.createdAtUnixSecs) return 1
    if (a.createdAtUnixSecs > b.createdAtUnixSecs) return -1
    return 0
  })
})

const onItemClicked = (uid) => {
  if (uid === selectedItemUid.value) {
    selectedItemUid.value = ""
    return
  }

  selectedItemUid.value = uid
}

const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: toggleMessageArchiveStatus,
  onMutate: async (uid) => {
    // Cancel any outgoing refetches, so they don't overwrite
    // our optimistic update.
    await queryClient.cancelQueries({ queryKey: ["messagesList"] })

    // Snapshot the previous value
    const messagesList = queryClient.getQueryData(["messagesList"])

    // Optimistically update to the new value
    queryClient.setQueryData(["messagesList"], (old) => {
      return old.map((message) => {
        if (message.uid === uid)
          return {
            ...message,
            isArchived: !message.isArchived,
          }

        return message
      })
    })

    // Return a context object with the snapshotted value
    return { messagesList }
  },
  onError: (err, uid, context) => {
    queryClient.setQueryData(["messagesList"], context.messagesList)
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ["messagesList"],
    })
  },
})

const onItemArchived = (uid) => {
  if (!mutation.isLoading.value) mutation.mutate(uid)
}
</script>

<template>
  <div class="sm:px-6">
    <h1 class="flex justify-between">
      <div class="font-semibold text-2xl pb-3">Messages</div>
      <div class="flex items-end">
        <button
          :class="[selectedTab === 'inbox' ? 'bg-teal-500 text-white' : '']"
          class="px-2 py-1 cursor-pointer"
          @click="onSelectTab('inbox')"
        >
          Inbox
        </button>
        <button
          :class="[selectedTab === 'archived' ? 'bg-teal-500 text-white' : '']"
          class="px-2 py-1 cursor-pointer"
          @click="onSelectTab('archived')"
        >
          Archived
        </button>
      </div>
    </h1>
    <div v-if="isLoading">
      <!-- Loading message -->
      <div class="text-2xl font-bold text-center">Loading messages ...</div>
    </div>
    <div v-else>
      <div v-if="messageItems.length > 0">
        <!-- List of Messages -->
        <div class="md:grid md:grid-cols-2 border-b border-t border-teal-500">
          <!-- Messages column -->
          <div
            class="py-1 pr-1 md:border-r border-teal-500"
            :class="selectedItemUid !== '' ? 'hidden md:block' : ''"
          >
            <MessageChooserItem
              v-for="message in messageItems"
              :key="message.uid"
              :message="message"
              @itemClicked="onItemClicked"
              @itemArchived="onItemArchived"
            />
          </div>
          <!-- Message content column -->
          <div class="px-3 pt-1 pb-3">
            <div v-if="selectedItem.email !== '' && selectedItem.body !== ''">
              <div>
                <button
                  type="button"
                  class="md:hidden hover:underline underline-offset-4 py-1"
                  @click="selectedItemUid = ''"
                >
                  &#xab; Back
                </button>
              </div>
              <div class="font-bold">Email</div>
              <div class="pl-4 mb-3 overflow-hidden text-ellipsis">
                <a
                  :href="`mailto:${selectedItem.email}`"
                  class="flex gap-1 hover:underline underline-offset-4"
                  title="Open in E-mail client"
                >
                  {{ selectedItem.email }}
                  <ExternalArrowIcon />
                </a>
              </div>
              <div class="font-bold">Message</div>
              <div class="pl-4">{{ selectedItem.body }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- No messages -->
        <div class="text-2xl text-center mt-12">No messages at this time</div>
      </div>
    </div>
  </div>
</template>
