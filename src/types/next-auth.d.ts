import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  isTwoFactorEnabled: boolean;
  image: string | null;
  role: "USER" | "ADMIN" | "MODERATOR";
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "USER" | "ADMIN" | "MODERATOR";
    sessionId?: string;
    provider?: string;
    user: ExtendedUser;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    emailVerified?: Date | null;
  }
}
