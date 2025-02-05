"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyToken } from "@/actions/auth/validation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { FormWrapper } from "@/components/ui";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>(
    "Confirmation email sent. Please verify your email."
  );

  useEffect(() => {
    const handleSubmit = async () => {
      if (token) {
        const verifiedToken = await verifyToken(token);
        if (verifiedToken?.success) {
          setSuccess("Email verified successfully. Please login to continue");
        }
        if (verifiedToken?.error) {
          setError(verifiedToken?.message || "Something went wrong");
        }
      }
    };
    handleSubmit();
  }, [token]);

  return (
    <FormWrapper>
      <FormError message={error} />
      <FormSuccess message={success} />
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

export default VerificationForm;

