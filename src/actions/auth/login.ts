"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginType } from "@/validations";

export const login = async (value: LoginType) => {
  try {
    await signIn("credentials", {
      ...value,
      redirect: false
    });
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      console.error("error message", err.cause?.err?.message);
      switch (err.cause?.err?.message) {
        case "Two-factor authentication required":
          return {
            error: true,
            twoFactor: true,
            message: "Two-factor authentication required"
          };
        case "Please verify email":
        case "Invalid two-factor code":
        case "Two-factor code expired":
        case "Invalid credentials":
          return { error: true, message: err.cause?.err?.message };
        default:
          return { error: true, message: "Something went wrong" };
      }
    }
  }
};
