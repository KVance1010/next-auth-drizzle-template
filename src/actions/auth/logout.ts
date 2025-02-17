"use server";

import { signOut } from "@/auth";
import { removeSession } from "@/db/queries/auth/session";
import { currentUser } from "@/utils/auth-session";
import removeCookies from "@/utils/remove-cookies";

export const logout = async () => {
  const user = await currentUser();
  await removeCookies();
  if (!user) {
    return;
  }

  await removeSession(user.id);
  await signOut();
};
