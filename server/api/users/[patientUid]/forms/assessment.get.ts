import { z, ZodError } from "zod"
import { getAssessmentForm } from "../../../../../models/user-forms"

const InputSchema = z.object({
  patientUid: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid } = getRouterParams(event)

    const input = InputSchema.parse({
      patientUid,
    })

    const assessmentForm = await getAssessmentForm(db, input.patientUid)

    return {
      message: "Retrieved assessment form",
      payload: assessmentForm,
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
