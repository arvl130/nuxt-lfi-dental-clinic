import { z, ZodError } from "zod"
import { createPatientUser } from "../../../../models/users"

const InputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
})

export default defineEventHandler(async (event) => {
  const { db, auth } = event.context.firebase
  try {
    const { email, password, fullName } = await readBody(event)

    const input = InputSchema.parse({
      email,
      password,
      fullName,
    })

    const user = await createPatientUser(
      db,
      auth,
      input.email,
      input.password,
      input.fullName
    )

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
