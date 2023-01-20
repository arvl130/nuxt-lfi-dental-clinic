import { createTransport } from "nodemailer"

export async function sendEmail(
  destinationEmail: string,
  subject: string,
  body: string
) {
  const { gmailAppEmail, gmailAppPassword } = useRuntimeConfig()

  if (!gmailAppEmail)
    throw createError({
      message: "Missing credentials for sending email",
      statusCode: 500,
    })

  if (!gmailAppPassword)
    throw createError({
      message: "Missing credentials for sending email",
      statusCode: 500,
    })

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: gmailAppEmail,
      pass: gmailAppPassword,
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
