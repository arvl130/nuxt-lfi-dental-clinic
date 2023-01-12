import { ZodError, z } from "zod"
import { getUser } from "../../../models/users"

const InputSchema = z.object({
  patientUid: z.string(),
})

export default defineEventHandler(async (event) => {
  const { auth } = event.context.firebase
  try {
    const { patientUid } = getRouterParams(event)
    const input = InputSchema.parse({
      patientUid,
    })
    const userRecord = await getUser(auth, input.patientUid)

    return {
      message: "User profile retrieved",
      payload: {
        uid: input.patientUid,
        userRecord,
      },
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unknown Error",
      message: `Unknown error occured: ${e}`,
    })
  }
})
