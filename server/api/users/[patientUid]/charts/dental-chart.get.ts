import { z, ZodError } from "zod"
import { getDentalChart } from "../../../../../models/user-charts"

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

    const dentalChart = await getDentalChart(db, input.patientUid)

    return {
      message: "Retrieved dental chart",
      payload: dentalChart,
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
