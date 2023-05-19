// Utilize the Next.js backend API for user authentication. Broken down, this is an API route with an API, auth,
// a dynamic nextauth, and then the route itself follows.

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// User authentication handler
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // Function to retrieve user data to keep session going
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    // Function to either sign in a user or create one if they don't already exist within the database.
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check to see if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If not then create a user
        if (!userExists) {
          await User.create({
            email: profile.email,
            // Handy way to make sure username has no spaces and is lowercase
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
