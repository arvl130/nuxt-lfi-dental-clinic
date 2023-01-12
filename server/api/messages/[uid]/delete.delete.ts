import { z, ZodError } from "zod"
import { removeMessage } from "../../../../models/messages"

const InputSchema = z.object({
  uid: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { uid } = getRouterParams(event)

    const input = InputSchema.parse({
      uid,
    })

    const message = await removeMessage(db, input.uid)

    return {
      message: "Message deleted",
      payload: message,
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
