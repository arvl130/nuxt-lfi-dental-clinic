import { z, ZodError } from "zod"
import { getDateTwoDaysBeforeTimeslot } from "~/utils/date-conversions"
import { cancelAppointment } from "~/models/appointments"

const InputSchema = z.object({
  patientUid: z.string(),
  slotSeconds: z.string(),
})

export default defineEventHandler(async (event) => {
  const {
    firebase: { db, auth },
    user,
  } = event.context

  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })

  if (user.accountType !== "patient")
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })

  try {
    const { patientUid, slotSeconds } = getRouterParams(event)

    const input = InputSchema.parse({
      patientUid,
      slotSeconds,
    })

    const dateTwoDaysBeforeTimeslot = getDateTwoDaysBeforeTimeslot(slotSeconds)

    if (Date.now() > dateTwoDaysBeforeTimeslot.getTime())
      throw createError({
        message: "Cancellation period exceeded.",
        statusCode: 400,
      })

    await cancelAppointment(db, auth, patientUid, slotSeconds)

    return {
      message: "Appointment cancelled",
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
