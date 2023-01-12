import { z, ZodError } from "zod"
import { getAppointmentProcedure } from "../../../../../../models/user-appointments"

const InputSchema = z.object({
  patientUid: z.string(),
  slotSeconds: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid, slotSeconds } = getRouterParams(event)

    const input = InputSchema.parse({
      patientUid,
      slotSeconds,
    })

    const userAppointmentProcedure = await getAppointmentProcedure(
      db,
      input.patientUid,
      input.slotSeconds
    )

    return {
      message: "User appointment procedure retrieved",
      payload: userAppointmentProcedure,
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
