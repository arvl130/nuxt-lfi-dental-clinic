import { z, ZodError } from "zod"
import { requestProcedureAccess } from "../../../../../../../models/user-appointments"

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

    await requestProcedureAccess(db, input.patientUid, input.slotSeconds)

    return {
      message: "Requested access to procedure",
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
