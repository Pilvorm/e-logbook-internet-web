import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { AUTH_URL } from "../../../constant";
import {
  getAuthUser,
  getModule,
  getModuleMobile,
  getRoleUser,
  onLogin,
  onLoginGuest,
  onSubmitSecurityCode,
} from "helpers/auth";

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials);
        const loginData = {
          username: credentials.username,
          password: credentials.password,
          applicationCode: "ELOGBOOK",
          getProfile: true,
        };

        try {
          return onLogin(loginData)
            .then(async (data) => {
              console.log(data, "<<<<<<< data");
              if (data.status === 400) {
                throw new Error(data.statusText);
              }
              const token = data.accessToken;
              const decoded = jwt_decode(token);

              const userData = {
                ...decoded,
                token,
                guest: false,
              };

              console.log(userData, "<<<<<<<<<");

              return userData;
            })
            .catch((err) => {
              if (err.Name) {
                throw new Error(err.Name[0]);
              } else if (err.Email) {
                throw new Error(err.Email[0]);
              }
              throw new Error("errorLogin"); // Throw a custom error
              // throw new Error(err)
            });
        } catch (e) {
          throw new Error("There was an error on user authentication");
        }
      },
    }),
  ],
  secret: "760195f445131d2fdb6af993548b76c6",
  session: {
    jwt: true,
    // maxAge: 1 * 24 * 60 * 60, // Expiration: 1 month
    maxAge: 2 * 60 * 60, // 2 hours in seconds
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log(url, baseUrl);
    //   // return "/home";
    // },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/",
    error: "/error",
  },
};

export default (req, res) => NextAuth(req, res, options);
