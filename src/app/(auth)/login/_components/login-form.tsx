"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth/login";
import { FormError } from "@/components/form-error";
import { Socials } from "@/components/socials";
import { FormButton, FormInput, FormWrapper } from "@/components/ui";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginType, LoginValidation } from "@/validations";


export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different login method"
      : "";
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
      code: undefined
    }
  });

  const onSubmit = async (values: LoginType) => {
    setError("");
    const loggedIn = await login(values);
    if (loggedIn?.error) {
      if (loggedIn.twoFactor) {
        setShowTwoFactor(true);
      } else {
        setError(loggedIn.message);
      }
    } else {
      if (loggedIn?.success) {
        redirect(DEFAULT_LOGIN_REDIRECT);
      }
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <fieldset disabled={form.formState.isSubmitting}>
          {!showTwoFactor ? (
            <>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="email@email.com"
                autoComplete="email"
                required
                register={form.register("email")}
                error={form.formState.errors.email?.message as string}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                register={form.register("password")}
                error={form.formState.errors.password?.message as string}
              />
            </>
          ) : (
            <>
              <FormInput
                label="Two Factor Code"
                name="code"
                type="text"
                placeholder="123456"
                register={form.register("code")}
                error={form.formState.errors.code?.message as string}
              />
            </>
          )}
        </fieldset>
        <FormButton disabled={form.formState.isSubmitting as boolean}>
          {form.formState.isSubmitting ? "Sending..." : "Login"}
        </FormButton>
        <div className="flex items-center">
          <Link
            href="/reset"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <FormError message={error || urlError} />
      </form>
      {!showTwoFactor && (
        <div className="border p-4 mt-4 rounded-3xl w-full max-w-md">
          <p className="text-white text-center my-4"> Login With </p>
          <Socials />
          <p className="text-white mt-2 text-center">
            Not Signed Up{" "}
            <Link
              className="pl-2 hover:text-blue-400 underline font-semibold text-md"
              href="/register"
            >
              Register
            </Link>
          </p>
        </div>
      )}
    </FormWrapper>
  );
};
