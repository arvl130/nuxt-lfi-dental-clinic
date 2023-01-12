import { z, ZodError } from "zod"
import { createAdminUser } from "../../../../models/users"

const InputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db, auth } = event.context.firebase
  try {
    const { email, password } = await readBody(event)

    const input = InputSchema.parse({
      email,
      password,
    })

    const user = await createAdminUser(db, auth, input.email, input.password)

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
