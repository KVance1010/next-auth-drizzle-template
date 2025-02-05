import { cache } from "react";
import "server-only";
import { auth } from "@/auth";

export const getCachedUser = cache(auth);

export const currentUser = async () => {
  const session = await getCachedUser();
  return session?.user;
};
