"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register } from "@/actions/auth/register";
import { Socials } from "@/components/socials";
import { FormButton, FormInput, FormWrapper } from "@/components/ui";
import { RegistrationType, RegistrationValidation } from "@/validations";

export const RegistrationForm = () => {
  const form = useForm<RegistrationType>({
    resolver: zodResolver(RegistrationValidation),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: RegistrationType) => {
    const newUser = await register(values);
    if (newUser?.error) {
      form.setError("email", { message: newUser?.message });
    }
    if (newUser?.success) {
      form.reset();
      redirect("/verification");
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <fieldset disabled={form.formState.isSubmitting}>
          <FormInput
            label="Username"
            name="username"
            placeholder="JohnDoe123"
            required
            register={form.register("username")}
            error={form.formState.errors.username?.message}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="email@email.com"
            autoComplete="email"
            required
            register={form.register("email")}
            error={form.formState.errors.email?.message}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            required
            register={form.register("password")}
            error={form.formState.errors.password?.message}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="********"
            required
            register={form.register("confirmPassword")}
            error={form.formState.errors.confirmPassword?.message}
          />

          <FormButton disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Sign Up"}
          </FormButton>
        </fieldset>
      </form>
      <div className="flex items-center w-full flex-col max-w-md">
        <p className="text-white text-center my-4">Or sign up with</p>
        <Socials />
        <p className="text-white text-center mt-2">
          Have an account already?{" "}
          <Link
            className="pl-2 hover:text-blue-400 underline font-semibold text-md"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </FormWrapper>
  );
};
