import { z, ZodError } from "zod"
import { setPatientSignature } from "../../../../../models/user-signatures"

const InputSchema = z.object({
  patientUid: z.string(),
  dataUrl: z.string(),
})

export default defineEventHandler(async (event) => {
  const {
    firebase: { db },
    user,
  } = event.context

  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })

  if (user.accountType !== "admin")
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })

  try {
    const { patientUid } = getRouterParams(event)
    const { dataUrl } = await readBody(event)

    const input = InputSchema.parse({
      patientUid,
      dataUrl,
    })

    await setPatientSignature(db, input.patientUid, input.dataUrl)

    return {
      message: "Updated patient signature",
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
