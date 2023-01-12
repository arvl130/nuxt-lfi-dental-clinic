import { z, ZodError } from "zod"
import { getAllAppointments } from "../../../../models/user-appointments"

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

    const appointments = await getAllAppointments(db, input.patientUid)

    return {
      message: "User appointments retrieved",
      payload: appointments,
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
