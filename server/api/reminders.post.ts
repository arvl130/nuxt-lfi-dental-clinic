import { z, ZodError } from "zod"

const InputSchema = z.object({
  message: z.string(),
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
    const { message } = await readBody(event)

    const input = InputSchema.parse({
      message,
    })

    await db.collection("reminders").doc("reminders").set(
      {
        message: input.message,
      },
      {
        merge: true,
      }
    )

    return {
      message: "Reminders set",
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
