import { z, ZodError } from "zod"
import { setAssessmentForm } from "../../../../../models/user-forms"

const InputSchema = z.object({
  patientUid: z.string(),
  dataUrl: z.object({
    diagnosis: z.string(),
    patientsComplaint: z.string(),
    treatmentPlan: z.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid } = getRouterParams(event)
    const { dataUrl } = await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      dataUrl,
    })

    await setAssessmentForm(db, input.patientUid, input.dataUrl)

    return {
      message: "Updated assessment form",
      payload: {
        dataUrl: input.dataUrl,
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
