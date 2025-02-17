import { cookies } from "next/headers";

export default async function removeCookies() {
  const cookiesStore = await cookies();
  cookiesStore.delete("authjs.csrf-token");
  cookiesStore.delete("authjs.session-token");
  return;
}
