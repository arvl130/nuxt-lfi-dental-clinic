import { z, ZodError } from "zod"
import { removeMessage } from "../../../../models/messages"

const InputSchema = z.object({
  uid: z.string(),
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
      message: "You must login to update your full name.",
    })

  if (user.accountType !== "admin")
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })

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
