import { z, ZodError } from "zod"
import { updateFullName } from "../../../../models/users"

const InputSchema = z.object({
  userId: z.string(),
  fullName: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db, auth } = event.context.firebase
  if (!event.context.user)
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You must login to update your full name.",
    })

  try {
    const { fullName } = await readBody(event)
    const { id: userId } = event.context.user

    const input = InputSchema.parse({
      userId,
      fullName,
    })

    const user = await updateFullName(db, auth, input.userId, input.fullName)

    return {
      message: "User created",
      payload: user,
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
