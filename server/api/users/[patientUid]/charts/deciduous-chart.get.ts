import { z, ZodError } from "zod"
import { getDeciduousChart } from "../../../../../models/user-charts"

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

    const deciduousChart = await getDeciduousChart(db, input.patientUid)

    return {
      message: "Retrieved deciduous chart",
      payload: deciduousChart,
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
