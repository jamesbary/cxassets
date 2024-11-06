import { transactions, users } from "@/db/schema";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const emailSchema = z.object({
  email: authSchema.shape.email,
});

export const tokenSchema = z.object({
  token: z.string().min(3, { message: "token is required" }),
});

export const emailStringSchema = authSchema.shape.email;

export const usernameSchema = z.object({
  username: z.string().min(4, {
    message: "Must be at least 4 characters long",
  }),
});

export const userSchema = z.object({
  name: z.string().min(4, {
    message: "Must be at least 4 characters long",
  }),
  username: z.string().min(3, {
    message: "Must be at least 3 characters long",
  }),
  image: z.optional(z.string().url()),
  country: z.optional(z.string().min(1)),
  role: z.optional(
    z
      .enum(users.role.enumValues, { required_error: "Must be a valid role" })
      .default(users.role.enumValues[0])
  ),
  email: authSchema.shape.email,
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

export const authWithAccountNumberSchema = z.object({
  type: z.enum(transactions.account.enumValues, {
    required_error: "Must be a valid account type",
  }),
  number: z.string().min(1),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

export const authWithCredentialsSchema = z.object({
  nameOrEmail: z.string().min(1),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

// export const authUserSchema = userSchema.merge(addressSchema);

export type AuthPayload = z.infer<typeof authSchema>;
export type AuthWithAccountNumberPayload = z.infer<
  typeof authWithAccountNumberSchema
>;
export type AuthWithCredentialsPayload = z.infer<
  typeof authWithCredentialsSchema
>;
export type EmailPayload = z.infer<typeof emailSchema>;
export type EmailStringPayload = z.infer<typeof emailStringSchema>;
export type TokenPayload = z.infer<typeof tokenSchema>;
export type UsernamePayload = z.infer<typeof usernameSchema>;
export type UserPayload = z.infer<typeof userSchema>;
