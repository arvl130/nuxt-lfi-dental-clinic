import { createMessage } from "../../models/messages"
import { z, ZodError } from "zod"

const InputSchema = z.object({
  body: z.string(),
  email: z.string(),
  senderName: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const { body, email, senderName } = await readBody(event)

    const input = InputSchema.parse({
      body,
      email,
      senderName,
    })

    const message = await createMessage(
      db,
      input.email,
      input.body,
      input.senderName
    )

    return {
      message: "Message created",
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
