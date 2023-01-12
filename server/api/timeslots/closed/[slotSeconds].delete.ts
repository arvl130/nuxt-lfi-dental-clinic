import { removeReservation } from "../../../../models/timeslots"
import { z, ZodError } from "zod"

const InputSchema = z.object({
  slotSeconds: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { slotSeconds } = getRouterParams(event)

    const input = InputSchema.parse({
      slotSeconds,
    })

    await removeReservation(db, input.slotSeconds)

    return {
      message: "Closed slot deleted",
      payload: input.slotSeconds,
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
