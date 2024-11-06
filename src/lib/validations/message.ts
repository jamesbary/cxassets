import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email" }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(1500, {
      message: "Message must not be longer than 1500 characters.",
    }),
});

export type EmailPayload = z.infer<typeof emailSchema>;
