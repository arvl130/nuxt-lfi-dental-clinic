import { ZodError, z } from "zod"
import { getUnavailableSlots } from "../../../../../models/timeslots"

const InputSchema = z.object({
  month: z.string(),
  year: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { month, year } = getRouterParams(event)
    const input = InputSchema.parse({
      month,
      year,
    })

    const unavailableSlots = await getUnavailableSlots(
      db,
      input.year,
      input.month
    )

    return {
      message: "List of unavailable timeslots",
      payload: unavailableSlots,
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
