<script setup>
import { useRoute } from "vue-router"
import DentalChart from "~/components/admin/DentalChart.vue"
import DeciduousChart from "~/components/admin/DeciduousChart.vue"
import PatientSignatureField from "~/components/admin/PatientSignatureField.vue"
import GuardianSignatureField from "~/components/admin/GuardianSignatureField.vue"
import {
  getAssessmentForm,
  setAssessmentForm,
} from "~/utils/api/forms/AssessmentForm"
import { getConsentForm, setConsentForm } from "~/utils/api/forms/ConsentForm"
import { getMonthName } from "~/utils/date-conversions"
import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth"

useHead({
  title: "Dental Chart \u2013 LFI Dental Clinic",
})

definePageMeta({ layout: "admin" })

const route = useRoute()
const patientUid = route.params.uid

const strokeColor = ref("#EF4444")
const setStrokeColor = (selected) => {
  switch (selected) {
    case "restoration":
      strokeColor.value = "#3B82F6"
      break
    case "rootCanal":
      strokeColor.value = "#22C55E"
      break
    case "extraction":
      strokeColor.value = "#EF4444"
      break
    case "missing":
      strokeColor.value = "#9CA3AF"
      break
    case "jacket":
      strokeColor.value = "#FDE047"
      break
    case "pontic":
      strokeColor.value = "#FB923C"
      break
  }

  Object.keys(isSelected).forEach((property) => {
    isSelected[property] = false
  })
  isSelected[selected] = true
}

const isSelected = reactive({
  restoration: false,
  rootCanal: false,
  extraction: true,
  missing: false,
  jacket: false,
  pontic: false,
})

const assessmentForm = reactive({
  patientsComplaint: "",
  diagnosis: "",
  treatmentPlan: "",
})

const { currentUser } = storeToRefs(useAuthStore())

watchEffect(async () => {
  if (!currentUser.value) return

  const retrievedAssessmentForm = await getAssessmentForm(patientUid)
  if (
    retrievedAssessmentForm &&
    Object.keys(retrievedAssessmentForm).length !== 0
  ) {
    const { patientsComplaint, diagnosis, treatmentPlan } =
      retrievedAssessmentForm

    assessmentForm.patientsComplaint = patientsComplaint ?? ""
    assessmentForm.diagnosis = diagnosis ?? ""
    assessmentForm.treatmentPlan = treatmentPlan ?? ""
  }
})

const isEditingAssessmentForm = ref(false)
const onSaveAssessmentForm = async () => {
  await setAssessmentForm(patientUid, assessmentForm)
  isEditingAssessmentForm.value = false
}

const consentForm = reactive({
  patientName: "",
  checked: {
    myself: false,
    son: false,
    daughter: false,
    relative: false,
  },
  dentistName: "",
  dateSigned: "",
})

watchEffect(async () => {
  if (!currentUser.value) return

  const retrievedConsentForm = await getConsentForm(patientUid)
  if (retrievedConsentForm && Object.keys(retrievedConsentForm).length !== 0) {
    const { patientName, checked, dentistName, dateSigned } =
      retrievedConsentForm

    consentForm.patientName = patientName ?? ""
    consentForm.checked.myself = checked.myself ?? false
    consentForm.checked.son = checked.son ?? false
    consentForm.checked.daughter = checked.daughter ?? false
    consentForm.checked.relative = checked.relative ?? false
    consentForm.dentistName = dentistName ?? ""
    consentForm.dateSigned = dateSigned ?? ""
  }
})

const isEditingConsentForm = ref(false)
const onSaveConsentForm = async () => {
  await setConsentForm(patientUid, consentForm)
  isEditingConsentForm.value = false
}

const formattedDate = computed(() => {
  if (consentForm.dateSigned) {
    const [year, month, day] = consentForm.dateSigned.split("-")
    const monthName = getMonthName(parseInt(month) - 1)
    return `${monthName} ${day}, ${year}`
  }
  return ""
})
</script>

<template>
  <div class="lg:px-6">
    <!-- Page title -->
    <h1 class="text-2xl font-semibold mb-3">
      <NuxtLink to="/admin/patient-records"> Patient Records </NuxtLink>
      >
      <NuxtLink :to="`/admin/patient-records/${patientUid}/dental-chart`">
        Dental Chart
      </NuxtLink>
    </h1>
    <!-- Top form  -->
    <div class="mb-8">
      <div class="flex justify-end mb-2">
        <button
          v-if="isEditingAssessmentForm"
          @click="onSaveAssessmentForm()"
          type="button"
          class="border border-teal-500 px-3 py-1 rounded-full font-normal hover:bg-teal-500 hover:text-white transition duration-200"
        >
          Save
        </button>
        <button
          v-else
          @click="isEditingAssessmentForm = true"
          type="button"
          class="border border-teal-500 px-4 py-1 rounded-full font-normal hover:bg-teal-500 hover:text-white transition duration-200"
        >
          Edit
        </button>
      </div>
      <div class="grid sm:grid-cols-[12rem_1fr] gap-2 mb-3 items-center">
        <div class="text-left sm:text-right">Patient's complaint:</div>
        <input
          v-if="isEditingAssessmentForm"
          v-model="assessmentForm.patientsComplaint"
          class="border-b border-sky-600 px-2 py-1"
        />
        <div class="border-b border-sky-600 px-2 py-1" v-else>
          <span v-if="assessmentForm.patientsComplaint === ''"><br /></span>
          <span v-else>
            {{ assessmentForm.patientsComplaint }}
          </span>
        </div>
      </div>
      <div class="mb-3">
        Clinical Examination (face, lips, cheeks, palate, tongue, missing teeth,
        oropharynx, gingivae, malocclusion)
      </div>
      <div class="grid sm:grid-cols-[12rem_1fr] gap-2 mb-3 items-center">
        <div class="text-left sm:text-right">Diagnosis:</div>
        <input
          v-if="isEditingAssessmentForm"
          v-model="assessmentForm.diagnosis"
          class="border-b border-sky-600 px-2 py-1"
        />
        <div class="border-b border-sky-600 px-2 py-1" v-else>
          <span v-if="assessmentForm.diagnosis === ''"><br /></span>
          <span v-else>
            {{ assessmentForm.diagnosis }}
          </span>
        </div>
      </div>
      <div class="grid sm:grid-cols-[12rem_1fr] gap-2 mb-3 items-center">
        <div class="text-left sm:text-right">Treatment Plan:</div>
        <input
          v-if="isEditingAssessmentForm"
          v-model="assessmentForm.treatmentPlan"
          class="border-b border-sky-600 px-2 py-1"
        />
        <div class="border-b border-sky-600 px-2 py-1" v-else>
          <span v-if="assessmentForm.treatmentPlan === ''"><br /></span>
          <span v-else>
            {{ assessmentForm.treatmentPlan }}
          </span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="mb-16">
      <!-- Legends -->
      <div
        class="max-w-fit mx-auto border border-sky-600 rounded-lg px-8 py-3 mb-8"
      >
        <div class="mb-2">Legends:</div>
        <div
          class="grid xs:grid-cols-2 xs:grid-rows-3 xs:grid-flow-col lg:grid-cols-3 lg:grid-rows-2 pl-8 gap-x-8 gap-y-2"
        >
          <div
            @click="setStrokeColor('restoration')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['restoration'],
            }"
          >
            <span class="text-blue-500">⬤</span>
            Restoration
          </div>
          <div
            @click="setStrokeColor('rootCanal')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['rootCanal'],
            }"
          >
            <span class="text-green-500">⬤</span>
            Root canal
          </div>
          <div
            @click="setStrokeColor('extraction')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['extraction'],
            }"
          >
            <span class="text-red-500">⬤</span>
            Extraction
          </div>
          <div
            @click="setStrokeColor('missing')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['missing'],
            }"
          >
            <span class="text-gray-400">⬤</span>
            Missing
          </div>
          <div
            @click="setStrokeColor('jacket')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['jacket'],
            }"
          >
            <span class="text-yellow-300">⬤</span>
            Jacket
          </div>
          <div
            @click="setStrokeColor('pontic')"
            class="rounded-full text-center pb-1 px-2"
            :class="{
              'bg-blue-300': isSelected['pontic'],
            }"
          >
            <span class="text-orange-400">⬤</span>
            Pontic
          </div>
        </div>
      </div>

      <!-- Dental chart -->
      <div class="mb-12">
        <DentalChart :strokeColor="strokeColor" :patientUid="patientUid" />
      </div>

      <!-- Deciduous chart -->
      <div>
        <DeciduousChart :strokeColor="strokeColor" :patientUid="patientUid" />
      </div>
    </div>

    <!-- Agreement -->
    <div class="max-w-4xl mx-auto text-justify">
      <div class="flex justify-end mb-2">
        <button
          v-if="isEditingConsentForm"
          @click="onSaveConsentForm()"
          type="button"
          class="border border-teal-500 px-3 py-1 rounded-full font-normal hover:bg-teal-500 hover:text-white transition duration-200"
        >
          Save
        </button>
        <button
          v-else
          @click="isEditingConsentForm = true"
          type="button"
          class="border border-teal-500 px-4 py-1 rounded-full font-normal hover:bg-teal-500 hover:text-white transition duration-200"
        >
          Edit
        </button>
      </div>
      <!-- Consent -->
      <div class="mb-16">
        I,
        <input
          v-if="isEditingConsentForm"
          type="text"
          class="border-b border-sky-600 max-w-[16rem] min-w-0 w-full"
          v-model="consentForm.patientName"
        />
        <span class="border-b border-sky-600" v-else>
          <span
            v-if="consentForm.patientName"
            class="inline-block w-[fit-content] px-3"
          >
            {{ consentForm.patientName }}
          </span>
          <span class="w-[min(100%,_16rem)] inline-block" v-else>
            <br />
          </span>
        </span>
        do hereby authorize the performance of dental treatment or whatever
        procedure be necessary upon (<input
          type="checkbox"
          v-model="consentForm.checked.myself"
          :disabled="!isEditingConsentForm"
        />) myself (<input
          type="checkbox"
          v-model="consentForm.checked.son"
          :disabled="!isEditingConsentForm"
        />) son (<input
          type="checkbox"
          v-model="consentForm.checked.daughter"
          :disabled="!isEditingConsentForm"
        />) daughter (<input
          type="checkbox"
          v-model="consentForm.checked.relative"
          :disabled="!isEditingConsentForm"
        />) relative, as discussed fully with me by
        <select v-model="consentForm.dentistName" v-if="isEditingConsentForm">
          <option value="">Choose ...</option>
          <option>Laarni Isidro</option>
          <option>Lani Isidro</option></select
        ><span class="border-b border-sky-600 max-w-[16rem]" v-else>
          <span
            v-if="consentForm.dentistName !== ''"
            class="inline-block w-fit-content px-3"
          >
            Dr. {{ consentForm.dentistName }} </span
          ><span class="w-[min(100%,_16rem)] inline-block" v-else
            ><br
          /></span> </span
        >. I also hereby certify that the above information given are correct as
        to the best of my knowledge.
      </div>

      <!-- Signature -->
      <div class="grid xs:grid-cols-2 xs:gap-4 xs:grid-rows-2">
        <div>
          <div class="max-w-[16rem] mx-auto">
            <input
              v-if="isEditingConsentForm"
              type="date"
              class="border-b border-sky-600 text-center w-full mb-2 min-w-0"
              v-model="consentForm.dateSigned"
            />
            <span
              class="border-b border-sky-600 text-center inline-block w-full mb-2 min-w-0"
              v-else
            >
              <span v-if="consentForm.dateSigned">
                {{ formattedDate }}
              </span>
              <span v-else><br /></span>
            </span>
            <div class="text-center">Date</div>
          </div>
        </div>
        <div class="xs:col-start-2">
          <PatientSignatureField :patientUid="patientUid" strokeColor="#000" />
          <div class="text-center">Patient's signature over printed name</div>
        </div>
        <div class="xs:col-start-2">
          <GuardianSignatureField :patientUid="patientUid" strokeColor="#000" />
          <div class="text-center">Guardian's signature over printed name</div>
        </div>
      </div>
    </div>
  </div>
</template>
