import { z, ZodError } from "zod"
import { createAppointment } from "../../../../models/appointments"

const InputSchema = z.object({
  patientUid: z.string(),
  service: z.string(),
  slotSeconds: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db, auth } = event.context.firebase
  try {
    const { slotSeconds, service, patientUid } = await readBody(event)

    const input = InputSchema.parse({
      slotSeconds,
      service,
      patientUid,
    })

    await createAppointment(
      db,
      auth,
      input.patientUid,
      input.service,
      input.slotSeconds
    )

    return {
      message: "New appointment created",
      payload: slotSeconds,
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
