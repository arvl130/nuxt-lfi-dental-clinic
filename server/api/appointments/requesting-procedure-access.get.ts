import { getRequestingProcedureAccess } from "../../../models/appointments"

export default defineEventHandler(async (event) => {
  const { db } = event.context.firebase
  try {
    const appointments = await getRequestingProcedureAccess(db)

    return {
      message: "List of appointments requesting procedure access",
      payload: appointments,
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Unknown Error",
      message: `Unknown error occured: ${e}`,
    })
  }
})
