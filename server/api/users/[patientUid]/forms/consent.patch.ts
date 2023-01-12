import { z, ZodError } from "zod"
import { setConsentForm } from "../../../../../models/user-forms"

const InputSchema = z.object({
  patientUid: z.string(),
  dataUrl: z.object({
    checked: z.object({
      daughter: z.boolean(),
      myself: z.boolean(),
      relative: z.boolean(),
      son: z.boolean(),
    }),
    dateSigned: z.string(),
    dentistName: z.string(),
    patientName: z.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { patientUid } = getRouterParams(event)
    const { dataUrl } = await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      dataUrl,
    })

    await setConsentForm(db, input.patientUid, input.dataUrl)

    return {
      message: "Updated consent form",
      payload: {
        dataUrl: input.dataUrl,
      },
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
