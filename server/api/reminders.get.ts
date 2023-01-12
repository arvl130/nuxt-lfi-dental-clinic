export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
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
