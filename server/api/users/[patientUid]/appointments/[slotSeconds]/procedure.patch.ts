import { z, ZodError } from "zod"
import { setAppointmentProcedure } from "../../../../../../models/user-appointments"

const InputSchema = z.object({
  patientUid: z.string(),
  slotSeconds: z.string(),
  procedureBody: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid, slotSeconds } = getRouterParams(event)
    const { procedureBody } = await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      slotSeconds,
      procedureBody,
    })

    await setAppointmentProcedure(
      db,
      input.patientUid,
      input.slotSeconds,
      input.procedureBody
    )

    return {
      message: "User appointment procedure set",
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
