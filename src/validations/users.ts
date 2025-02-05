import z from "zod";

export const RegistrationValidation = z
  .object({
    username: z.string().trim().min(1, { message: "this field is required" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "this field is required" })
      .email(),
    password: z.string().trim().min(6, "Minimum of 6 characters required"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Minimum of 6 characters required")
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "password didn't match",
        path: ["confirmPassword"]
      });
    }
  });

export const LoginValidation = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "this field is required" })
    .email(),
  password: z.string().trim().min(1, "this field is required"),
  // code: z.optional(z.string().trim().min(6, "Minimum of 6 characters required"))
  code: z.string().trim().min(6, "Minimum of 6 characters required").optional()
});

export const TwoFactorCodeValidation = z.object({
  // code: z.optional(z.string().trim().min(6, "Minimum of 6 characters required"))
  code: z.string().trim().min(6, "Minimum of 6 characters required").optional()
});

export const ResetValidation = z.object({
  email: z.string().trim().min(1, { message: "this field is required" }).email()
});

export const NewPasswordValidation = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "Minimum of 6 characters required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Minimum of 6 characters required"),
    code: z.optional(
      z.string().trim().min(6, "Minimum of 6 characters required")
    )
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "password didn't match",
        path: ["confirmPassword"]
      });
    }
  });

export const UpdateUserValidation = z
  .object({
    name: z.optional(z.string().trim()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([...roles] as const),
    role: z.enum(["USER", "ADMIN", "MODERATOR"]),
    email: z.optional(z.string().trim().email()),
    password: z.optional(z.string().trim()),
    confirmPassword: z.optional(
      z.string().trim().min(6, "Minimum of 6 characters required")
    ),
    newPassword: z.optional(
      z.string().trim().min(6, "Minimum of 6 characters required")
    )
  })
  .superRefine(({ confirmPassword, password, newPassword }, ctx) => {
    if (!password || !confirmPassword || !newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "all password fields are required to change your password",
        path: ["password"]
      });
      ctx.addIssue({
        code: "custom",
        message: "all password fields are required to change your password",
        path: ["confirmPassword"]
      });
      ctx.addIssue({
        code: "custom",
        message: "all password fields are required to change your password",
        path: ["newPassword"]
      });
    }
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "new passwords did not match",
        path: ["confirmPassword"]
      });
    }
  });

export type UpdateUserType = z.infer<typeof UpdateUserValidation>;
export type TwoFactorCodeType = z.infer<typeof TwoFactorCodeValidation>;
export type LoginType = z.infer<typeof LoginValidation>;
export type ResetType = z.infer<typeof ResetValidation>;
export type NewPasswordType = z.infer<typeof NewPasswordValidation>;
export type RegistrationType = z.infer<typeof RegistrationValidation>;
