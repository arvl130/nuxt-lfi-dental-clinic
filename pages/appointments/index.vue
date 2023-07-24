<script setup>
import HeroSection from "~/components/patient/HeroSection.vue"
import CalendarWidget from "~/components/admin/CalendarWidget.vue"
import SetAppointmentCalendarItem from "~/components/patient/SetAppointmentCalendarItem.vue"
import TimeslotsWidget from "~/components/admin/TimeslotsWidget.vue"
import SetAppointmentTimeslotsItem from "~/components/patient/SetAppointmentTimeslotsItem.vue"
import EmailNeedsVerificationDialog from "~/components/dialogs/EmailNeedsVerificationDialog.vue"
import BoxDialog from "~/components/dialogs/BoxDialog.vue"
import {
  getDateOfTimeslot,
  getUnixSecondsFromObject,
  getMonthIndex,
  getDateTomorrow,
  getDate,
} from "~/utils//date-conversions"
import { getTimeslots } from "~/utils/api/Timeslots"
import { useAppointmentDetailsStore } from "~/stores/appointmentDetails"
import { useSetAppointmentCalendarStore } from "~/stores/setAppointmentCalendar"
import { isSignedIn } from "~/utils/auth/session"
import { userIsPatient } from "~/utils/auth/user-role"
import { newAppointment } from "~/utils/api/user-appointments/Appointments"
import { useRoute, useRouter } from "vue-router"
import { isFilledInMedicalChart } from "~/utils//api/charts/MedicalChart"
import { getAuth } from "firebase/auth"

useHead({
  title: "Set an Appointment \u2013 LFI Dental Clinic",
})

onUnmounted(() => {
  appointmentDetailsStore.$reset()
})

/* Logic for reactive calendar items */
const selected = reactive({
  month: "",
  year: "",
})

const setAppointmentCalendarStore = useSetAppointmentCalendarStore()
const calendarItems = ref([])
const isFinishLoading = ref(false)

onMounted(async () => {
  const currDate = new Date()

  // Make sure we are getting the current month
  // from UTC+8 (Asia/Manila).
  selected.month = currDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
  })

  // Make sure we are getting the current year
  // from UTC+8 (Asia/Manila).
  selected.year = currDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
  })

  // Set the date tomorrow in UTC+8 (Asia/Manila) time
  // as the initial selected date.
  const initialSelectedDate =
    parseInt(
      currDate.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        day: "numeric",
      })
    ) + 1

  await setAppointmentCalendarStore.setMonthAndYear(
    selected.month,
    selected.year
  )
  for (const n of Array(setAppointmentCalendarStore.getDayCount).keys()) {
    const currentDate = n + 1
    let closedSlotsOnGivenDate = 0
    let takenSlotsOnGivenDate = 0

    setAppointmentCalendarStore.getUnavailableSlots.map((unavailableSlot) => {
      if (getDateOfTimeslot(unavailableSlot.timeslot) === currentDate) {
        if (unavailableSlot.status === "closed") closedSlotsOnGivenDate++
        else if (unavailableSlot.status === "taken") takenSlotsOnGivenDate++
      }
    })

    if (currentDate === initialSelectedDate)
      calendarItems.value.push({
        date: currentDate,
        selected: true,
        closedSlotCount: closedSlotsOnGivenDate,
        takenSlotCount: takenSlotsOnGivenDate,
      })
    else
      calendarItems.value.push({
        date: currentDate,
        selected: false,
        closedSlotCount: closedSlotsOnGivenDate,
        takenSlotCount: takenSlotsOnGivenDate,
      })
  }

  // Make sure setMonthAndYear is finished before we show the page.
  await nextTick()
  isFinishLoading.value = true
})

const onCalendarItemClicked = (newSelectedItem) => {
  // Don't allow clicking if the slots are full.
  if (
    newSelectedItem.closedSlotCount + newSelectedItem.takenSlotCount ===
    getTimeslots().length
  )
    return

  // Don't allow clicking if the calendar item is today, or in the past.
  const date = getDate(
    parseInt(selected.year),
    getMonthIndex(selected.month) + 1,
    newSelectedItem.date
  )
  const dateTomorrow = getDateTomorrow()
  if (date.getTime() < dateTomorrow.getTime()) return

  // Set the selected status of the clicked item to true,
  // everything else is false.
  calendarItems.value = calendarItems.value.map((calendarItem) => ({
    ...calendarItem,
    selected: calendarItem === newSelectedItem ? true : false,
  }))
}

// Monitor selected date, so we can conditionally show
// the timeslots for a given date.
const selectedDate = computed(() => {
  const selectedItem = calendarItems.value.find(
    (calendarItem) => calendarItem.selected === true
  )

  if (selectedItem) return selectedItem.date
  return ""
})

const onChangeMonthOrYear = async () => {
  // Hide the calendar temporarily.
  isFinishLoading.value = false

  // Set new month in the store.
  await setAppointmentCalendarStore.setMonthAndYear(
    selected.month,
    selected.year
  )

  // Reset calendar items, then build
  // a new list of calendar items with all
  // items unselected.
  calendarItems.value = []
  for (const n of Array(setAppointmentCalendarStore.getDayCount).keys()) {
    calendarItems.value.push({
      date: n + 1,
      selected: false,
    })
  }

  // Wait for all request to flush,
  // then show the calendar again.
  await nextTick()
  isFinishLoading.value = true
}

/* Logic for reactive timeslot items */
const timeslotItems = ref([])

// Split timeslots to morning and afternoon slots for our template.
const morningTimeslotItems = computed(() => {
  return timeslotItems.value.filter((timeslotItem) => timeslotItem.hours < 12)
})

const afternoonTimeslotItems = computed(() => {
  return timeslotItems.value.filter((timeslotItem) => timeslotItem.hours >= 12)
})

const onTimeslotItemClicked = (newTimeslotItemClicked) => {
  if (newTimeslotItemClicked.closed || newTimeslotItemClicked.taken) return

  const lastTimeslotItemClicked = timeslotItems.value.find(
    (timeslotItem) => timeslotItem.selected === true
  )

  if (lastTimeslotItemClicked === newTimeslotItemClicked) {
    timeslotItems.value = timeslotItems.value.map((timeslotItem) => ({
      ...timeslotItem,
      selected: false,
    }))

    return
  }

  timeslotItems.value = timeslotItems.value.map((timeslotItem) => {
    return {
      ...timeslotItem,
      selected: timeslotItem === newTimeslotItemClicked ? true : false,
    }
  })
}

// Reset our timeslots whenever the date changes.
watch(selectedDate, () => {
  if (selectedDate.value !== "")
    timeslotItems.value = getTimeslots().map((timeslot) => {
      const timeInUnixSecs = getUnixSecondsFromObject(
        selectedDate.value,
        getMonthIndex(selected.month) + 1,
        parseInt(selected.year),
        timeslot[0],
        timeslot[1]
      )

      let isClosed = false
      let isTaken = false

      setAppointmentCalendarStore.getUnavailableSlots.forEach(
        (unavailableSlot) => {
          // If our timestamp is in the list, color our time slot.
          if (unavailableSlot.timeslot === timeInUnixSecs.toString()) {
            if (unavailableSlot.status === "closed") isClosed = true
            else if (unavailableSlot.status === "taken") isTaken = true
          }
        }
      )

      return {
        hours: timeslot[0],
        minutes: timeslot[1],
        selected: false,
        closed: isClosed,
        taken: isTaken,
        timestamp: timeInUnixSecs,
      }
    })
})

const selectedTimeslot = computed(() => {
  const timeslotItem = timeslotItems.value.find(
    (timeslotItem) => timeslotItem.selected === true
  )

  if (timeslotItem) return timeslotItem.timestamp
  else return ""
})

/* Logic for saving choices and Account Dialog */
const appointmentDetailsStore = useAppointmentDetailsStore()
const isAccountExistsDialogVisible = ref(false)

const route = useRoute()
const router = useRouter()

const selectedService = ref("")
const errorDialogBody = ref("")
const isErrorDialogVisible = ref(false)
const isSuccessModalVisible = ref(false)
const isEmailNeedsVerificationDialogVisible = ref(false)

const onGoNext = async () => {
  appointmentDetailsStore.setDetails(
    selectedService.value,
    selectedTimeslot.value
  )

  if (!isSignedIn()) {
    isAccountExistsDialogVisible.value = true
    return
  }

  if (!(await userIsPatient())) {
    isAccountExistsDialogVisible.value = true
    return
  }

  const auth = getAuth()
  const isEmailVerified = auth.currentUser.emailVerified

  if (!isEmailVerified) {
    isEmailNeedsVerificationDialogVisible.value = true
    return
  }

  const patientUid = auth.currentUser.uid
  const isMedicalChartFilledIn = await isFilledInMedicalChart(patientUid)

  if (!isMedicalChartFilledIn) {
    router.push({
      name: "Appointments Page Medical Chart",
    })
    return
  }

  await newAppointment(
    patientUid,
    appointmentDetailsStore.getSlotSeconds,
    appointmentDetailsStore.getService
  )

  appointmentDetailsStore.$reset()
  isSuccessModalVisible.value = true
}

onMounted(() => {
  const preselectedService = route.query.service
  if (preselectedService) selectedService.value = preselectedService
})

async function onEmailVerified() {
  isEmailNeedsVerificationDialogVisible.value = false

  // Email is now verified, continue whatever you were trying to do
  // when clicking Next.
  await onGoNext()
}
</script>

<template>
  <HeroSection>Book an Appointment</HeroSection>
  <div class="max-w-5xl mx-auto px-6 mt-14 mb-20">
    <!-- Month chooser -->
    <div class="mb-10">
      <h3 class="font-bold text-3xl mb-1">Select a Date and Time *</h3>
      <p class="max-w-prose">
        Same day appointments are
        <span class="font-semibold">not allowed</span>. You may cancel your
        appointment up to
        <span class="font-semibold">three (3) days</span> prior to the scheduled
        date and time.
      </p>
    </div>
    <!-- Date chooser -->
    <div
      v-if="isFinishLoading"
      class="grid justify-center lg:grid-cols-[auto_1fr] gap-6"
    >
      <!-- Calendar -->
      <div>
        <!-- Month & Year chooser -->
        <div class="sm:flex sm:gap-4 sm:h-14">
          <div class="mb-3 sm:hidden">
            <div class="lg:mb-3">
              <span class="text-gray-300">&#x2B24;</span> Close
            </div>
            <div class="lg:mb-3">
              <span class="text-sky-700">&#x2B24;</span> Reserved
            </div>
          </div>
          <!-- Month -->
          <div class="h-fit border border-teal-600 px-4 py-2 rounded-full mb-3">
            <select
              class="w-full bg-transparent"
              v-model="selected.month"
              @change="onChangeMonthOrYear()"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
          <!-- Year -->
          <div class="h-fit border border-teal-600 px-4 py-2 rounded-full mb-3">
            <select
              class="w-full bg-transparent"
              v-model="selected.year"
              @change="onChangeMonthOrYear()"
            >
              <option>2022</option>
              <option>2023</option>
            </select>
          </div>
          <div class="hidden sm:grid ml-auto sm:grid-cols-2 items-center pr-4">
            <div class="sm:mb-3">
              <span class="text-gray-300">&#x2B24;</span> Closed
            </div>
            <div class="sm:mb-3">
              <span class="text-sky-700">&#x2B24;</span> Reserved
            </div>
          </div>
        </div>
        <CalendarWidget>
          <!-- Offset -->
          <div
            class="border border-teal-500 text-right px-2"
            v-for="_ in setAppointmentCalendarStore.getOffset"
            :key="_"
          ></div>
          <!-- Actual dates -->
          <SetAppointmentCalendarItem
            v-for="calendarItem in calendarItems"
            :key="calendarItem.date"
            :date="calendarItem.date"
            :month="selected.month"
            :year="selected.year"
            :isSelected="calendarItem.selected"
            :closedSlotCount="calendarItem.closedSlotCount"
            :takenSlotCount="calendarItem.takenSlotCount"
            @click="onCalendarItemClicked(calendarItem)"
          />
        </CalendarWidget>
      </div>
      <!-- Time chooser -->
      <div class="pt-14">
        <TimeslotsWidget v-if="selectedDate !== ''">
          <template #morning-slots>
            <SetAppointmentTimeslotsItem
              v-for="(timeslotItem, index) in morningTimeslotItems"
              :key="index"
              :hours="timeslotItem.hours"
              :minutes="timeslotItem.minutes"
              :isSelected="timeslotItem.selected"
              :isClosed="timeslotItem.closed"
              :isTaken="timeslotItem.taken"
              @click="onTimeslotItemClicked(timeslotItem)"
            />
          </template>
          <template #afternoon-slots>
            <SetAppointmentTimeslotsItem
              v-for="(timeslotItem, index) in afternoonTimeslotItems"
              :key="index"
              :hours="timeslotItem.hours"
              :minutes="timeslotItem.minutes"
              :isSelected="timeslotItem.selected"
              :isClosed="timeslotItem.closed"
              :isTaken="timeslotItem.taken"
              @click="onTimeslotItemClicked(timeslotItem)"
            />
          </template>
        </TimeslotsWidget>
        <div class="">
          <div class="px-6 py-4" v-if="selectedTimeslot">
            <div class="text-sm mb-3">
              Not sure what you're looking for? See some our
              <NuxtLink
                to="/#services"
                class="hover:underline underline-offset-4 font-medium"
              >
                services</NuxtLink
              >.
            </div>
            <div class="border border-teal-600 px-4 py-1 rounded-full">
              <select class="w-full bg-transparent" v-model="selectedService">
                <option value="" selected>Choose a service ...</option>
                <option>Check up</option>
                <option
                  title="A thorough examination of your oral health combined with a scale and clean."
                >
                  Oral Prophylaxis
                </option>
                <option
                  title="This can help you get your teeth back to their original function while also preventing further decay."
                >
                  Tooth Restoration
                </option>
                <option
                  title="Also known as tooth bleaching. It is a process of lightening the color of human teeth."
                >
                  Tooth Whitening
                </option>
                <option title="Removal of teeth">Tooth Extraction</option>
                <option
                  title="Devices used in orthodontics that align and straighten teeth and help position them with regard to a person's bite, while also aiming to improve dental health. "
                >
                  Orthodontic Braces
                </option>
                <option
                  title="It can strengthen enamel and protect teeth against damage from plaque. Along with possibly making dietary changes, using these fluoride treatments can help the teeth repair any minor damage from tooth decay. "
                >
                  Fluoride Treatment
                </option>
                <option
                  title="This denture is an oral prosthetic device that replaces some of missing teeth. This is also removable denture."
                >
                  Partial Denture
                </option>
                <option
                  title="A full-coverage oral prosthetic devices that replaces a complete arch of missing teeth. It is a removable appliance used when all teeth within a jaw have been lost and need to be prosthetically replaced."
                >
                  Complete Denture
                </option>
                <option
                  title="A full porcelain ceramic covered crown which is used to protect the entire surface of a tooth. Crowns are an ideal way to rebuild teeth which have been broken or weakened by decay or large fillings."
                >
                  Jacket Crown
                </option>
                <option
                  title="A partial denture that is secured permanently in the mouth by being cemented to the adjacent teeth or roots."
                >
                  Fixed Bridge
                </option>
              </select>
            </div>
          </div>
          <div
            v-if="selectedTimeslot && selectedService"
            class="flex justify-end"
          >
            <button
              type="button"
              class="px-8 py-1 rounded-full text-white bg-teal-500 hover:bg-teal-400 transition duration-200"
              @click="onGoNext()"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-2xl font-bold text-center" v-else>Loading calendar...</div>
  </div>

  <BoxDialog v-if="isAccountExistsDialogVisible">
    <template #header>
      <div class="mb-3 mt-1 text-2xl font-semibold">Login Required</div>
    </template>
    <template #body>
      <div class="max-w-[24rem] mb-5 mt-1">
        An account is needed to set an appointment. Do you have an account
        already?
      </div>
    </template>
    <template #actions>
      <div class="grid gap-2 mb-3">
        <NuxtLink
          class="border border-sky-600 hover:border-sky-500 text-center bg-sky-600 hover:bg-sky-500 transition duration-200 text-white font-semibold py-1"
          to="/appointments/create-account"
        >
          Create an Account
        </NuxtLink>
        <NuxtLink
          class="border border-sky-600 hover:bg-sky-100 font-medium transition duration-300 text-center py-1"
          to="/appointments/login"
        >
          I have an account
        </NuxtLink>
        <button
          type="button"
          class="border border-sky-600 hover:bg-sky-50 transition duration-300 w-full py-1 font-medium"
          @click="isAccountExistsDialogVisible = false"
        >
          Cancel
        </button>
      </div>
      <div></div>
    </template>
  </BoxDialog>

  <BoxDialog v-if="isSuccessModalVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">✅ Success</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        <!-- Your account has been created. Some additional information will be asked
        in order to complete your appointment. -->
        We have scheduled your appointment with one of our dentists. Please
        remember to attend your appointment on the reserved date and time.
      </div>
      <div class="max-w-[32rem] text-justify mb-3">
        You may cancel your appointment up to
        <span class="font-semibold">three (3) days</span> prior to the scheduled
        date.
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <NuxtLink class="border border-sky-600 px-6 py-1" to="/patient/history">
          Done
        </NuxtLink>
      </div>
    </template>
  </BoxDialog>

  <EmailNeedsVerificationDialog
    v-if="isEmailNeedsVerificationDialogVisible"
    @email-verified="onEmailVerified"
  />

  <BoxDialog v-if="isErrorDialogVisible">
    <template #header>
      <div class="font-semibold text-2xl mb-1">Login Failed</div>
    </template>
    <template #body>
      <div class="max-w-[32rem] text-justify mb-3">
        {{ errorDialogBody }}
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          type="button"
          class="border border-sky-600 px-6 py-1"
          @click="isErrorDialogVisible = false"
        >
          OK
        </button>
      </div>
    </template>
  </BoxDialog>
</template>
