<script setup>
import { computed, onMounted, reactive, ref } from "vue"
import { DateTime } from "luxon"
import { getAuth } from "@firebase/auth"

const props = defineProps({
  patientUid: {
    type: String,
    required: true,
  },
  personalInformation: Object,
  medicalHistory: Object,
  dentalHistory: Object,
})

onMounted(async () => {
  if (props.personalInformation) {
    Object.keys(personalInformation).forEach((property) => {
      personalInformation[property] = props.personalInformation[property]
    })
  }

  if (props.medicalHistory) {
    Object.keys(medicalHistory).forEach((property) => {
      medicalHistory[property] = props.medicalHistory[property]
    })

    if (medicalHistory.heartAilmentDisease !== "")
      heartAilmentDiseaseIsEnabled.value = true
    if (medicalHistory.hospitalAdmission !== "")
      hospitalAdmissionIsEnabled.value = true
    if (medicalHistory.selfMedication !== "")
      selfMedicationIsEnabled.value = true
    if (medicalHistory.allergies !== "") allergiesIsEnabled.value = true
    if (medicalHistory.operation !== "") operationIsEnabled.value = true
    if (medicalHistory.tumors !== "") tumorsGrowthIsEnabled.value = true
    if (medicalHistory.pregnant !== "") pregnantIsEnabled.value = true
  }

  if (props.dentalHistory) {
    Object.keys(dentalHistory).forEach((property) => {
      dentalHistory[property] = props.dentalHistory[property]
    })

    if (dentalHistory.pastDentalCare !== "")
      pastDentalCareIsEnabled.value = true
  }

  const auth = getAuth()
  const idTokenResult = await auth.currentUser.getIdTokenResult()
  // For patient users, try to detect if we have at least our name
  // filled in already. This is useful for newly created patient
  // accounts who have just been asked to fill in the medical chart.
  if (
    idTokenResult.claims.accountType === "patient" &&
    auth.currentUser.displayName
  ) {
    personalInformation.fullName = auth.currentUser.displayName
  }
})

const personalInformation = reactive({
  fullName: "",
  gender: "",
  birthDate: "",
  maritalStatus: "",
  mobileNo: "",
  telephoneNo: "",
})
const getAgeFromBirthdate = computed(() => {
  if (!personalInformation.birthDate) return "N/A"

  const duration = DateTime.fromFormat(
    personalInformation.birthDate,
    "yyyy-MM-dd",
    {
      zone: "Asia/Manila",
    }
  ).diffNow("years").years
  const dropSign = Math.abs(duration)
  const dropDecimals = Math.trunc(dropSign)
  return dropDecimals
})

const medicalHistory = reactive({
  heartAilmentDisease: "",
  hospitalAdmission: "",
  selfMedication: "",
  allergies: "",
  operation: "",
  tumors: "",
  diabetes: false,
  sinusitis: false,
  bleedingGums: false,
  hypertension: false,
  stomachDisease: false,
  bloodDisease: false,
  headache: false,
  liverDisease: false,
  cold: false,
  kidneyDisease: false,
  pregnant: "",
  familyHistory: "",
})

const medicalHistoryIsDisabled = ref(false)
const onClearMedicalHistory = () => {
  if (medicalHistoryIsDisabled.value) {
    medicalHistory.heartAilmentDisease = ""
    medicalHistory.hospitalAdmission = ""
    medicalHistory.selfMedication = ""
    medicalHistory.allergies = ""
    medicalHistory.operation = ""
    medicalHistory.tumors = ""
    medicalHistory.diabetes = false
    medicalHistory.sinusitis = false
    medicalHistory.bleedingGums = false
    medicalHistory.hypertension = false
    medicalHistory.stomachDisease = false
    medicalHistory.bloodDisease = false
    medicalHistory.headache = false
    medicalHistory.liverDisease = false
    medicalHistory.cold = false
    medicalHistory.kidneyDisease = false
    medicalHistory.pregnant = ""
    medicalHistory.familyHistory = ""

    heartAilmentDiseaseIsEnabled.value = false
    hospitalAdmissionIsEnabled.value = false
    selfMedicationIsEnabled.value = false
    allergiesIsEnabled.value = false
    operationIsEnabled.value = false
    tumorsGrowthIsEnabled.value = false
    pregnantIsEnabled.value = false
  }
}

const heartAilmentDiseaseIsEnabled = ref(false)
const onChangeHeartAilmentDisease = () => {
  if (!heartAilmentDiseaseIsEnabled.value)
    medicalHistory.heartAilmentDisease = ""
}

const hospitalAdmissionIsEnabled = ref(false)
const onChangeHospitalAdmission = () => {
  if (!hospitalAdmissionIsEnabled.value) medicalHistory.hospitalAdmission = ""
}

const selfMedicationIsEnabled = ref(false)
const onChangeSelfMedication = () => {
  if (!selfMedicationIsEnabled.value) medicalHistory.selfMedication = ""
}

const allergiesIsEnabled = ref(false)
const onChangeAllergies = () => {
  if (!allergiesIsEnabled.value) medicalHistory.allergies = ""
}

const operationIsEnabled = ref(false)
const onChangeOperation = () => {
  if (!operationIsEnabled.value) medicalHistory.operation = ""
}

const tumorsGrowthIsEnabled = ref(false)
const onChangeTumorsGrowth = () => {
  if (!tumorsGrowthIsEnabled.value) medicalHistory.tumors = ""
}

const pregnantIsEnabled = ref(false)
const onChangePregnant = () => {
  if (!pregnantIsEnabled.value) medicalHistory.pregnant = ""
}

const dentalHistory = reactive({
  bleedingInMouth: false,
  gumsChangeColor: false,
  sensitiveTeeth: false,
  badBreath: false,
  palate: false,
  teethChangeColor: false,
  lumpsInMouth: false,
  clickingSoundInMouth: false,
  pastDentalCare: "",
})

const dentalHistoryIsDisabled = ref(false)
const onClearDentalHistory = () => {
  if (dentalHistoryIsDisabled.value) {
    dentalHistory.bleedingInMouth = false
    dentalHistory.gumsChangeColor = false
    dentalHistory.sensitiveTeeth = false
    dentalHistory.badBreath = false
    dentalHistory.palate = false
    dentalHistory.teethChangeColor = false
    dentalHistory.lumpsInMouth = false
    dentalHistory.clickingSoundInMouth = false
    dentalHistory.pastDentalCare = ""

    pastDentalCareIsEnabled.value = false
  } else dentalHistoryIsDisabled.value = false
}

const pastDentalCareIsEnabled = ref(false)
const onChangePastDentalCare = () => {
  if (!pastDentalCareIsEnabled.value) dentalHistory.pastDentalCare = ""
}
</script>

<template>
  <!-- Personal Information -->
  <div class="mb-6">
    <h3 class="text-center font-semibold text-xl mb-3">Personal Information</h3>
    <div class="border border-teal-500 px-8 py-6 rounded-3xl">
      <!-- Name & Gender -->
      <div
        class="grid xs:grid-cols-[3fr_2fr] lg:grid-cols-[5fr_2fr] gap-4 mb-3"
      >
        <!-- Name -->
        <div class="grid grid-cols-[auto_1fr] gap-2 sm:gap-4 items-center">
          <label class="font-semibold">Name*</label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            v-model="personalInformation.fullName"
          />
        </div>

        <!-- Gender -->
        <div class="grid grid-cols-[auto_1fr] items-center gap-4">
          <label class="font-semibold">Gender*</label>
          <select
            class="rounded-full px-4 py-2 border border-teal-500 w-full bg-white"
            v-model="personalInformation.gender"
          >
            <option value="" disabled hidden>Choose ...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <!-- Birthdate, Age, Marital Status -->
      <div class="grid md:grid-cols-[1fr_2fr] gap-4 mb-3">
        <!-- Birthdate -->
        <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 sm:gap-4">
          <label class="font-semibold">Birthdate*</label>
          <input
            type="date"
            class="rounded-full px-4 py-2 border border-teal-500 w-full text-center"
            v-model="personalInformation.birthDate"
            min="1900-01-01"
            :max="new Date().toLocaleDateString('en-us')"
          />
        </div>
        <!-- Age & Marital Status -->
        <div class="grid sm:grid-cols-[1fr_2fr] md:grid-cols-2 gap-4">
          <!-- Age -->
          <div
            class="grid grid-cols-[auto_1fr] justify-between items-center gap-4"
          >
            <label class="font-semibold">Age*</label>
            <span
              type="text"
              class="rounded-full px-4 py-2 border border-teal-500 w-full pointer-events-none"
            >
              {{ getAgeFromBirthdate }}
            </span>
          </div>
          <!-- Marital Status -->
          <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 sm:gap-4">
            <label class="font-semibold">Marital Status*</label>
            <select
              v-model="personalInformation.maritalStatus"
              class="rounded-full px-4 py-2 border border-teal-500 w-full bg-white"
            >
              <option value="" disabled hidden>Choose ...</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Mobile number, Telephone number -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 sm:gap-4">
          <label class="font-semibold">Mobile No.</label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            v-model="personalInformation.mobileNo"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 sm:gap-4">
          <label class="font-semibold">Telephone No.</label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            v-model="personalInformation.telephoneNo"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Medical History -->
  <div class="mb-6">
    <h3 class="text-center font-semibold text-xl mb-3">Medical History</h3>
    <div
      class="border border-teal-500 px-8 py-6 rounded-3xl"
      :class="{
        'bg-gray-50': medicalHistoryIsDisabled,
      }"
    >
      <!-- Toggle form -->
      <div class="grid grid-cols-[1fr_auto] gap-4 mb-3">
        <div class="font-semibold">Please check the items the that apply.</div>
        <label class="font-semibold flex gap-4">
          <input
            type="checkbox"
            @change="onClearMedicalHistory()"
            v-model="medicalHistoryIsDisabled"
          />
          None
        </label>
      </div>
      <!-- First section -->
      <div class="grid md:grid-flow-col md:grid-cols-2 md:grid-rows-3 gap-x-4">
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeHeartAilmentDisease()"
              v-model="heartAilmentDiseaseIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Heart Ailment/Disease
          </label>
          <input
            type="text"
            placeholder="Blood Pressure"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            v-model="medicalHistory.heartAilmentDisease"
            :class="{
              'pointer-events-none': !heartAilmentDiseaseIsEnabled,
              'bg-gray-200': !heartAilmentDiseaseIsEnabled,
            }"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeHospitalAdmission()"
              v-model="hospitalAdmissionIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Hospital Admission
          </label>
          <input
            type="text"
            placeholder="Reason"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !hospitalAdmissionIsEnabled,
              'bg-gray-200': !hospitalAdmissionIsEnabled,
            }"
            v-model="medicalHistory.hospitalAdmission"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeSelfMedication()"
              v-model="selfMedicationIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Self-medication
          </label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !selfMedicationIsEnabled,
              'bg-gray-200': !selfMedicationIsEnabled,
            }"
            v-model="medicalHistory.selfMedication"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeAllergies()"
              v-model="allergiesIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Allergies
          </label>
          <input
            type="text"
            placeholder="Food/Medicine"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !allergiesIsEnabled,
              'bg-gray-200': !allergiesIsEnabled,
            }"
            v-model="medicalHistory.allergies"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeOperation()"
              v-model="operationIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Operation
          </label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !operationIsEnabled,
              'bg-gray-200': !operationIsEnabled,
            }"
            v-model="medicalHistory.operation"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 mb-3">
          <label class="flex items-center gap-4 font-semibold">
            <input
              type="checkbox"
              @change="onChangeTumorsGrowth()"
              v-model="tumorsGrowthIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Tumor/Growth
          </label>
          <input
            type="text"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !tumorsGrowthIsEnabled,
              'bg-gray-200': !tumorsGrowthIsEnabled,
            }"
            v-model="medicalHistory.tumors"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
      </div>
      <!-- Second section -->
      <div
        class="grid gap-y-2 xs:grid-cols-2 gap-x-4 md:grid-flow-col md:grid-rows-3 md:grid-cols-4 mb-3"
      >
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.diabetes"
            :disabled="medicalHistoryIsDisabled"
          />
          Diabetes
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.sinusitis"
            :disabled="medicalHistoryIsDisabled"
          />
          Sinusitis
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.bleedingGums"
            :disabled="medicalHistoryIsDisabled"
          />
          Bleeding Gums
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.hypertension"
            :disabled="medicalHistoryIsDisabled"
          />
          Hypertension
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.stomachDisease"
            :disabled="medicalHistoryIsDisabled"
          />
          Stomach Disease
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.bloodDisease"
            :disabled="medicalHistoryIsDisabled"
          />
          Blood Disease
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.headache"
            :disabled="medicalHistoryIsDisabled"
          />
          Headache
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.liverDisease"
            :disabled="medicalHistoryIsDisabled"
          />
          Liver Disease
        </label>
        <div
          class="grid grid-cols-[auto_1fr] gap-4 items-center xs:col-span-2 sm:col-span-1 md:col-span-2"
        >
          <label class="font-semibold flex gap-4">
            <input
              type="checkbox"
              @change="onChangePregnant()"
              v-model="pregnantIsEnabled"
              :disabled="medicalHistoryIsDisabled"
            />
            Pregnant
          </label>
          <input
            type="text"
            placeholder="No. of Months"
            class="rounded-full px-4 py-2 border border-teal-500 w-full"
            :class="{
              'pointer-events-none': !pregnantIsEnabled,
              'bg-gray-200': !pregnantIsEnabled,
            }"
            v-model="medicalHistory.pregnant"
            :disabled="medicalHistoryIsDisabled"
          />
        </div>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.cold"
            :disabled="medicalHistoryIsDisabled"
          />
          Cold
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="medicalHistory.kidneyDisease"
            :disabled="medicalHistoryIsDisabled"
          />
          Kidney Disease
        </label>
      </div>
      <!-- Bottom section -->
      <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 items-center">
        <label class="font-semibold">
          Family history on any of the above concerns
        </label>
        <input
          type="text"
          class="rounded-full px-4 py-2 border border-teal-500 w-full"
          :class="{
            'pointer-events-none': medicalHistoryIsDisabled,
            'bg-gray-200': medicalHistoryIsDisabled,
          }"
          v-model="medicalHistory.familyHistory"
          :disabled="medicalHistoryIsDisabled"
        />
      </div>
    </div>
  </div>

  <!-- Dental History -->
  <div class="mb-6">
    <h3 class="text-center font-semibold text-xl mb-3">Dental History</h3>
    <div
      class="border border-teal-500 px-8 py-6 rounded-3xl"
      :class="{
        'bg-gray-50': dentalHistoryIsDisabled,
      }"
    >
      <!-- Toggle form -->
      <div class="grid grid-cols-[1fr_auto] gap-4 mb-3">
        <div class="font-semibold">Please check the items that apply.</div>
        <label class="font-semibold flex gap-4">
          <input
            type="checkbox"
            v-model="dentalHistoryIsDisabled"
            @change="onClearDentalHistory"
          />
          None
        </label>
      </div>
      <!-- First section -->
      <div
        class="grid xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 sm:grid-flow-col gap-y-4 mb-3"
      >
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.bleedingInMouth"
            :disabled="dentalHistoryIsDisabled"
          />
          Bleeding in Mouth
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.gumsChangeColor"
            :disabled="dentalHistoryIsDisabled"
          />
          Gums change color
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.badBreath"
            :disabled="dentalHistoryIsDisabled"
          />
          Bad Breath
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.palate"
            :disabled="dentalHistoryIsDisabled"
          />
          Palate
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.teethChangeColor"
            :disabled="dentalHistoryIsDisabled"
          />
          Teeth color Change
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.lumpsInMouth"
            :disabled="dentalHistoryIsDisabled"
          />
          Lumps in mouth
        </label>
      </div>
      <!-- Second section -->
      <div class="grid md:grid-cols-2 gap-y-4 mb-3">
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.sensitiveTeeth"
            :disabled="dentalHistoryIsDisabled"
          />
          Sensitive teeth (hot/cold/sweet)
        </label>
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="dentalHistory.clickingSoundInMouth"
            :disabled="dentalHistoryIsDisabled"
          />
          Clicking sound in mouth when chewing
        </label>
      </div>
      <!-- Bottom section -->
      <div class="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 items-center">
        <label class="font-semibold flex gap-4 items-center">
          <input
            type="checkbox"
            v-model="pastDentalCareIsEnabled"
            @change="onChangePastDentalCare()"
            :disabled="dentalHistoryIsDisabled"
          />
          Past Dental Care/Treatments
        </label>
        <input
          type="text"
          class="rounded-full px-4 py-2 border border-teal-500 w-full"
          :class="{
            'pointer-events-none': !pastDentalCareIsEnabled,
            'bg-gray-200': !pastDentalCareIsEnabled,
          }"
          v-model="dentalHistory.pastDentalCare"
          :disabled="dentalHistoryIsDisabled"
        />
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="flex justify-center">
    <slot
      :personalInformation="personalInformation"
      :medicalHistory="medicalHistory"
      :dentalHistory="dentalHistory"
    ></slot>
  </div>
</template>
