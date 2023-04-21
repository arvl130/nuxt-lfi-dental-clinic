import { getAuth } from "firebase/auth"
import { userIsAdmin, userIsPatient } from "./auth/user-role"
import { useAppointmentDetailsStore } from "~/stores/appointmentDetails"

export async function redirectToAdminHomePageIfAdminUser() {
  if (await userIsAdmin()) {
    return {
      name: "Admin Home Page",
    }
  }
}

export async function redirectToAdminLoginIfNotAdminUser() {
  if (!(await userIsAdmin())) {
    return {
      // Use single login for both Admin and Patient.
      name: "Patient Login Page",
    }
  }
}

export async function redirectToAdminLoginIfNotLoggedInUser() {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser) {
    return {
      // Use single login for both Admin and Patient.
      name: "Patient Login Page",
    }
  }
}

export async function redirectToAppointmentsPageIfAppointmentDetailsIsNull() {
  const appointmentDetails = useAppointmentDetailsStore()
  if (!appointmentDetails.isInitialized)
    return {
      name: "Appointments Page Choose Timeslot",
    }
}

export async function redirectToPatientAppointmentHistoryPageIfPatientUser() {
  if (await userIsPatient()) {
    return {
      name: "Patient Appointment History Page",
    }
  }
}

export async function redirectToPatientLoginIfNotLoggedInUser() {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser) {
    return {
      name: "Patient Login Page",
    }
  }
}

export async function redirectToPatientLoginIfNotPatientUser() {
  if (!(await userIsPatient())) {
    return {
      name: "Patient Login Page",
    }
  }
}
