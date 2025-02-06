import authConfig from "@/auth.config";
import db from "@/db";
import {
  createTwoFactorConfirmation,
  deleteTwoFactorToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail
} from "@/db/queries/auth/two-factor-tokens";
import { generateVerificationToken } from "@/db/queries/auth/verification-tokens";
import {
  getUserByEmail,
  getUserById,
  linkAccountToUser
} from "@/db/queries/users";
import { sendTwoFactorAuth } from "@/email-templates/two-factor-code";
import { sendVerificationEmail } from "@/email-templates/welcome-verification";
import { ExtendedUser } from "@/types/next-auth";
import { comparePassword } from "@/utils/password";
import { LoginValidation } from "@/validations";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createSession } from "./db/queries/auth/session";
import { accounts, authenticators, sessions, users } from "./db/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    authenticatorsTable: authenticators
  }),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await linkAccountToUser(user.id);
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return !!user;
      }
      try {
        const existingUser = await getUserByEmail(user?.email as string);

        if (existingUser?.password) {
          return "/login?error=CredentialsOnly";
        }
        return true;
      } catch {
        return "/login?error=OAuthError";
      }
    },

    async jwt({ account, token, user }) {
      if (account?.provider === "credentials" && user) {
        const session = await createSession(user?.id as string);
        token.sessionId = session?.sessionToken;
        token.provider = "credentials";
        token.role = (user as ExtendedUser).role || "USER";
      }
      if (!token.role) {
        token.provider = token.role = "USER";
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;
      const currentUser = await getUserById(token.sub as string);
      const user = {
        id: currentUser?.id || "",
        name: currentUser?.name || null,
        username: currentUser?.username || null,
        email: currentUser?.email || "",
        isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || false,
        image: currentUser?.image || null,
        role: currentUser?.role || "USER",
        isOAuth: session.user.isOAuth || false
      };

      session.user = user;
      return session;
    }
  },
  pages: {
    signIn: "/login",
    verifyRequest: "verification",
    newUser: "/register"
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      authorize: async (credentials) => {
        const parsedData = LoginValidation.safeParse(credentials);
        if (!parsedData.success) throw new Error("Invalid credentials");

        const { email, password, code } = parsedData.data;
        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.password)
          throw new Error("Invalid credentials");

        const isPasswordValid = await comparePassword(
          password,
          existingUser.password
        );

        if (!isPasswordValid) throw new Error("Invalid credentials");

        if (!existingUser.emailVerified) {
          const newToken = await generateVerificationToken(email);
          await sendVerificationEmail(newToken.email, newToken.token);
          throw new Error("Please verify email");
        }

        if (existingUser.isTwoFactorEnabled) {
          if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
              existingUser.email as string
            );

            if (!twoFactorToken || twoFactorToken.token !== code) {
              throw new Error("Invalid two-factor code");
            }

            if (new Date() > twoFactorToken.expires) {
              throw new Error("Two-factor code expired");
            }

            await Promise.all([
              deleteTwoFactorToken(twoFactorToken.id),
              createTwoFactorConfirmation(existingUser.id)
            ]);
          } else {
            const twoFactorToken = await generateTwoFactorToken(email);
            if (twoFactorToken?.email && twoFactorToken?.token) {
              await sendTwoFactorAuth(
                twoFactorToken.email,
                twoFactorToken.token
              );
              throw new Error("Two-factor authentication required");
            }
          }
        }
        return existingUser;
      }
    })
  ]
});
