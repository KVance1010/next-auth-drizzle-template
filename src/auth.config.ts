import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      profile(profile) {
        return {
          role: "USER",
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.email.split("@")[0],
          isTwoFactorEnabled: false,
          isOAuth: true
        };
      },
      allowDangerousEmailAccountLinking: true
    })
  ]
} satisfies NextAuthConfig;
