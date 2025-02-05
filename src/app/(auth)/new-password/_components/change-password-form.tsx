"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordReset } from "@/actions/auth/password-reset";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FormButton, FormInput, FormWrapper } from "@/components/ui";
import { NewPasswordType, NewPasswordValidation } from "@/validations";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordValidation),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (values: NewPasswordType) => {
    setError("");
    setSuccess("");
    const completedReset = await passwordReset(values, token);
    if (completedReset.success) {
      form.reset();
      setSuccess(completedReset.message);
    }
    if (completedReset.error) {
      setError(completedReset.message);
    }
  };

  return (
    <FormWrapper>
      <form className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <FormInput
            label="New Password"
            name="password"
            type="password"
            placeholder="*********"
            required
            error={form.formState.errors.password?.message}
            register={form.register("password")}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="*********"
            required
            error={form.formState.errors.confirmPassword?.message}
            register={form.register("confirmPassword")}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <FormButton disabled={form.formState.isSubmitting as boolean}>
            {form.formState.isSubmitting ? "Sending..." : "Reset Password"}
          </FormButton>
        </fieldset>
      </form>
      <p className="text-white text-center mt-2">
        Return to
        <Link
          className="pl-2 hover:text-blue-400 underline font-semibold text-md"
          href="/login"
        >
          Login
        </Link>
      </p>
    </FormWrapper>
  );
};

export default NewPasswordForm;
