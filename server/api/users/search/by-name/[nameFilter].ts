import { ZodError, z } from "zod"
import { getUsersByName } from "../../../../../models/users"

const InputSchema = z.object({
  nameFilter: z.string(),
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
    const { nameFilter } = getRouterParams(event)
    const input = InputSchema.parse({
      nameFilter,
    })
    const users = await getUsersByName(db, input.nameFilter)

    return {
      message: "User profile retrieved",
      payload: {
        users,
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
