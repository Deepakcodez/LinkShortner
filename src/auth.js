import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import googleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credntials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async ({ email, password }) => {
        console.log(">>>>>>>>>>>", email);

        if (typeof email !== "string") {
          throw new CredentialsSignin({
            cause: "Email is not valid",
          });
        }

        const user = { email, id: "gfgf" };

        if (password !== "111111") {
          throw new CredentialsSignin({
            cause: "Password does not matched",
          });
        } else {
          return user;
        }
      },
    }),
  ],
});
