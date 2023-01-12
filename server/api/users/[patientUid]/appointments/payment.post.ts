import { z, ZodError } from "zod"
import { setAppointmentPayment } from "../../../../../models/user-appointments"

const InputSchema = z.object({
  patientUid: z.string(),
  slotSeconds: z.string(),
  price: z.number().positive().finite(),
  amountPaid: z.number().positive().finite(),
  status: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid, slotSeconds } = getRouterParams(event)
    const { price, amountPaid, status } = await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      slotSeconds,
      price,
      amountPaid,
      status,
    })

    await setAppointmentPayment(
      db,
      input.patientUid,
      input.slotSeconds,
      input.price,
      input.amountPaid,
      input.status
    )

    return {
      message: "Appointment payment set",
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
