import { createReservation } from "../../../models/timeslots"
import { z, ZodError } from "zod"

const InputSchema = z.object({
  slotSeconds: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { slotSeconds } = await readBody(event)

    const input = InputSchema.parse({
      slotSeconds,
    })

    await createReservation(db, input.slotSeconds, "closed")

    return {
      message: "Closed slot added",
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
