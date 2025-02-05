"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <button
      onClick={() => onClick("google")}
      className="bg-white self-center w-full my-2 hover:bg-blue-400 text-black p-2 
   text-center rounded-lg"
    >
      Google
    </button>
  );
};
