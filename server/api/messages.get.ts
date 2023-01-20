import { getAllMessages } from "../../models/messages"

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
    const messages = await getAllMessages(db)

    return {
      message: "List of all messages",
      payload: messages,
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unknown Error",
      message: `Unknown error occured: ${e}`,
    })
  }
})
