import { getArchivedAnyNUsers } from "../../../models/users"

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const upToNUsers = 8
    const users = await getArchivedAnyNUsers(db, upToNUsers)

    return {
      message: "List of users",
      payload: {
        users,
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
