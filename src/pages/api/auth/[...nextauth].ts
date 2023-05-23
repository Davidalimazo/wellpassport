import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '../../../lib/prismadb';
import { CustomError } from '@/lib/error';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomError('Invalid credentials', 401);
        }

        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new CustomError('Invalid credentials', 401);
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new CustomError('Invalid credentials', 401);
        }
        return user;

        // if (credentials.password !== user.password) {
        //   throw new CustomError('Invalid credentials', 401);
        // }

        // return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.users.findUnique({
        where: { email: token?.email as string },
      });

      if (!dbUser) {
        return token;
      }

      return {
        id: dbUser.id,
        role: dbUser.role,
        email: dbUser.email,
        picture: dbUser?.image,
        lastName: dbUser.lastName,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token?.picture;
        session.user.role = token.role;
        session.user.lastName = token.lastName;
      }
      return session;
    },
    redirect() {
      return '/client';
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
    signOut: '/login',
    error: '/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
