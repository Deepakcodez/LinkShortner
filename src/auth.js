import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import googleProvider from "next-auth/providers/google";
import Users from "./app/models/user.model";
import { connect } from "./app/dbConfig/dbConnection";
import { compare } from "bcryptjs";

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

      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;
        console.log(">>>>>>>>>>>from auth page", email, password);

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Please fill Email and Password both",
          });
        }
        //connect database
         connect();
         //searching user in database
        const user = await Users.findOne({ email }).select("+password");
        
        if(!user){
          throw new CredentialsSignin({
            cause: "Invalid user and password",
          });
        }
        
        const isMatch = await compare(password, user.password)

        if(!isMatch){
          throw new CredentialsSignin({
            cause: "Invalid Email and password",
          });
        }
          console.log('>>>>>>>>>>>user find from auth page', user)
          return user;
        
      },
    }),
  ],
  pages: {
    signIn : "/auth/signin"
  }
});
