"use server";

import { sendEmail } from "@/lib/mail";
import { emailSchema, type EmailPayload } from "@/lib/validations/message";

export const sendMessage = async (input: EmailPayload) => {
  const { email, message } = emailSchema.parse(input);

  if (!email || !message) return "Could not validate your inputs";

  await sendEmail(email, message);
};
