import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const { data: session } = useSession();
  return session?.user?.role;
};
