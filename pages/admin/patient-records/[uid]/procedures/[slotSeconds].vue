<script setup>
import { useRoute } from "vue-router"
import {
  getUserAppointmentProcedure,
  setUserAppointmentProcedure,
} from "~/utils//api/user-appointments/AppointmentProcedures"
import {
  setProcedureAccessAllowed,
  setProcedureAccessDisallowed,
} from "~/utils//api/user-appointments/AppointmentProcedureAccess"
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth"

useHead({
  title: "Procedure \u2013 LFI Dental Clinic",
})

definePageMeta({ layout: "admin" })

const route = useRoute()
const patientUid = route.params.uid
const slotSeconds = route.params.slotSeconds
const procedure = reactive({
  body: "",
  visible: null,
})

const isFinishedLoading = ref(false)
const { currentUser } = storeToRefs(useAuthStore())

watchEffect(async () => {
  if (!currentUser.value) return

  const appointmentProcedure = await getUserAppointmentProcedure(
    patientUid,
    slotSeconds
  )
  procedure.visible = appointmentProcedure.procedureVisible
  procedure.body = appointmentProcedure.procedure
  await nextTick()

  isFinishedLoading.value = true
})

const isEditingMode = ref(false)
const textarea = ref()

const onEdit = async () => {
  isEditingMode.value = true
  await nextTick()
  textarea.value.focus()
}

const onSave = async () => {
  isEditingMode.value = false
  await setUserAppointmentProcedure(patientUid, slotSeconds, procedure.body)
}

const onAllowAccess = async () => {
  await setProcedureAccessAllowed(patientUid, slotSeconds)
  procedure.visible = true
}

const onDisallowAccess = async () => {
  await setProcedureAccessDisallowed(patientUid, slotSeconds)
  procedure.visible = false
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-3">
      <NuxtLink to="/admin/patient-records">Patient Records</NuxtLink>
      >
      <NuxtLink :to="`/admin/patient-records/${patientUid}/treatments`">
        Dental Treatment
      </NuxtLink>
      >
      <NuxtLink
        :to="`/admin/patient-records/${patientUid}/procedures/${slotSeconds}`"
        >Procedure
      </NuxtLink>
    </h1>
  </div>
  <div v-if="isFinishedLoading" class="max-w-prose mx-auto mt-6">
    <div v-if="isEditingMode" class="h-72">
      <textarea
        class="border-2 border-teal-500/60 p-5 w-full resize-none m-0 h-full"
        v-model="procedure.body"
        ref="textarea"
      ></textarea>
    </div>
    <div v-else class="border-2 border-teal-500/60 p-5 w-full resize-none h-72">
      {{ procedure.body }}
    </div>

    <div
      class="flex mt-4"
      :class="{
        'justify-between': procedure.visible === 'requesting',
        'justify-end':
          procedure.visible === true || procedure.visible === false,
      }"
    >
      <div>
        <button
          v-if="isEditingMode"
          class="border-teal-500 border 1px rounded-full py-1 px-5 text-sm mr-3 hover:bg-teal-500 hover:text-white"
          @click="onSave()"
        >
          Save
        </button>
        <button
          class="border-teal-500 border 1px rounded-full py-1 px-5 text-sm mr-3 hover:bg-teal-500 hover:text-white"
          @click="onEdit()"
          v-else
        >
          Edit
        </button>
      </div>
      <div>
        <button
          class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
          @click="onAllowAccess()"
          v-if="procedure.visible === false"
        >
          Allow Access
        </button>
        <button
          class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
          @click="onDisallowAccess()"
          v-if="procedure.visible === true"
        >
          Remove Access
        </button>
        <div v-if="procedure.visible === 'requesting'" class="flex gap-3">
          Requesting access:
          <button
            class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
            @click="onAllowAccess()"
          >
            Allow
          </button>
          <button
            class="border-teal-500 border 1px rounded-full py-1 px-2 text-sm hover:bg-teal-500 hover:text-white"
            @click="onDisallowAccess()"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="text-2xl font-bold text-center mt-12" v-else>
    Loading procedure ...
  </div>
</template>
