import { z, ZodError } from "zod"
import { setMedicalChart } from "../../../../../models/user-charts"

const InputSchema = z.object({
  patientUid: z.string(),
  personalInformation: z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    fullName: z.string().min(1).max(191),
    gender: z.union([
      z.literal("male"),
      z.literal("female"),
      z.literal("other"),
    ]),
    maritalStatus: z.union([
      z.literal("single"),
      z.literal("married"),
      z.literal("widowed"),
      z.literal("separated"),
    ]),
    mobileNo: z.string().max(191),
    telephoneNo: z.string().max(191),
  }),
  medicalHistory: z.object({
    allergies: z.string().max(191),
    bleedingGums: z.boolean(),
    bloodDisease: z.boolean(),
    cold: z.boolean(),
    diabetes: z.boolean(),
    familyHistory: z.string().max(191),
    headache: z.boolean(),
    heartAilmentDisease: z.string().max(191),
    hospitalAdmission: z.string().max(191),
    hypertension: z.boolean(),
    kidneyDisease: z.boolean(),
    liverDisease: z.boolean(),
    operation: z.string().max(191),
    pregnant: z.string().max(191),
    selfMedication: z.string().max(191),
    sinusitis: z.boolean(),
    stomachDisease: z.boolean(),
    tumors: z.string().max(191),
  }),
  dentalHistory: z.object({
    badBreath: z.boolean(),
    bleedingInMouth: z.boolean(),
    clickingSoundInMouth: z.boolean(),
    gumsChangeColor: z.boolean(),
    lumpsInMouth: z.boolean(),
    palate: z.boolean(),
    pastDentalCare: z.string().max(191),
    sensitiveTeeth: z.boolean(),
    teethChangeColor: z.boolean(),
  }),
})

export default defineEventHandler(async (event) => {
  const { db, auth } = event.context.firebase
  try {
    const { patientUid } = getRouterParams(event)
    const { personalInformation, medicalHistory, dentalHistory } =
      await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      personalInformation,
      medicalHistory,
      dentalHistory,
    })

    // Update name in Firebase Auth.
    await auth.updateUser(patientUid, {
      displayName: input.personalInformation.fullName,
    })

    // Update name in root user collection.
    await db.collection("users").doc(input.patientUid).set(
      {
        displayName: input.personalInformation.fullName,
      },
      {
        merge: true,
      }
    )

    // Update medical chart itself.
    await setMedicalChart(
      db,
      input.patientUid,
      input.personalInformation,
      input.medicalHistory,
      input.dentalHistory
    )

    return {
      message: "Updated medical chart",
      payload: {
        uid: input.patientUid,
        personalInformation: input.personalInformation,
        medicalHistory: input.medicalHistory,
        dentalHistory: input.dentalHistory,
      },
    }
  } catch (e) {
    if (e instanceof ZodError)
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: `Validation error occured: ${e.message}`,
      })

    throw createError({
      statusCode: 500,
      statusMessage: "Unknown Error",
      message: `Unknown error occured: ${e}`,
    })
  }
})
