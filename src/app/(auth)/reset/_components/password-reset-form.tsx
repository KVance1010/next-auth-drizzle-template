"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordResetRequest } from "@/actions/auth/password-reset";
import { FormError } from "@/components/form-error";
import { FormButton, FormInput, FormWrapper } from "@/components/ui";
import { ResetType, ResetValidation } from "@/validations";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<ResetType>({
    resolver: zodResolver(ResetValidation),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (values: ResetType) => {
    setError("");
    const resetSent = await passwordResetRequest(values);
    if (resetSent?.error) {
      form.setError("email", { message: resetSent?.message });
    } else {
      redirect("/verification");
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <fieldset disabled={form.formState.isSubmitting}>
          <h1 className="text-2xl text-white text-center mb-4">
            Password Reset
          </h1>
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
          <FormError message={error} />
          <FormButton disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Send Reset Email"}
          </FormButton>
        </fieldset>
      </form>
    </FormWrapper>
  );
};

export default ResetForm;
