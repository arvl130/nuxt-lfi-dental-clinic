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
    const docSnap = await db.collection("reminders").doc("reminders").get()

    return {
      message: "Reminders retrieved",
      payload: docSnap.exists
        ? {
            message: docSnap.data()?.message ?? "",
          }
        : {
            message: "",
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
