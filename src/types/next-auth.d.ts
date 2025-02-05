import { ExtendedUser } from "@/types/next-auth";
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
    provide?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    emailVerified?: Date | null; 
  }
}


export type ExtendedUser = Session["user"];




// import { type DefaultSession } from "next-auth";
// import { ExtendedUser } from "@/types/next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       role: "USER" | "ADMIN" | "MODERATOR";
//       isTwoFactorEnabled: boolean;
//       isOAuth: boolean;
//       username: string | null;
//       name: string | null;
//       email: string;
//       emailVerified: Date | null;
//       image: string | null;
//     } & DefaultSession["user"];
//   }
// }
// export type ExtendedUser = Session["user"];
