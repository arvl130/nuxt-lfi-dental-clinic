import { createTransport } from "nodemailer"

export async function sendEmail(
  destinationEmail: string,
  subject: string,
  body: string
) {
  const { GMAIL_APP_EMAIL, GMAIL_APP_PASSWORD } = process.env

  if (!GMAIL_APP_EMAIL)
    throw createError({
      message: "Missing credentials for sending email",
      statusCode: 500,
    })

  if (!GMAIL_APP_PASSWORD)
    throw createError({
      message: "Missing credentials for sending email",
      statusCode: 500,
    })

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_APP_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  const info = await transporter.sendMail({
    from: "'LFI Dental Clinic' <noreply@lfidentalclinic.web.app>",
    to: destinationEmail,
    subject,
    text: body,
  })
  console.log("Message sent: %s to %s", info.messageId, destinationEmail)
}
