import { Suspense } from "react";
import VerificationForm from "./_components/verification-form";

export default function VerificationPage() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationForm />
      </Suspense>
    </div>
  );
}
