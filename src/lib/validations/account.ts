import { z } from "zod";

export const businessAccountSchema = z.object({
  businessName: z.string().min(2, {
    message: "Must be at least 2 characters long",
  }),
  businessType: z.string().min(2, {
    message: "Must be at least 2 characters long",
  }),
});

export type BusinessAccountPayload = z.infer<typeof businessAccountSchema>;
