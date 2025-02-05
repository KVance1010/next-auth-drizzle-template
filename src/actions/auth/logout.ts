"use server";

import { signOut } from "@/auth";
import { removeSession } from "@/db/queries/auth/session";
import { currentUser } from "@/utils/auth-session";

export const logout = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  await removeSession(user.id);
  await signOut();
};
