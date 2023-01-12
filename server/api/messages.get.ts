import { getAllMessages } from "../../models/messages"

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
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
