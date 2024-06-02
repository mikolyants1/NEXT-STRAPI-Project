import NextAuth, { DefaultSession, User } from 'next-auth';
import { Roles } from '@prisma/client';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { UsersApi } from './api/users.api';

interface IExtendedUser {
    uuid: string;
    role: Roles;
    password:string;
    username:string
}


export type ExtendedUser = IExtendedUser & DefaultSession["user"];

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

import 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        role?: Roles;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db.getPrisma()),
    session: {
        strategy: 'jwt',
    },
    events: {
        // Triggering creating of Strapi user when first login via provider
        createUser: async ({ user }) => {
            const prisma_user = await db.getPrisma().user.update({
                where: {
                    id: user.id,
                },
                data: {
                    roles: 'USER',
                },
            });
            await UsersApi.getClient().createUser({
              username:user.name as string,
              password:prisma_user.password,
              posts:{data:[]},
              uuid:String(prisma_user.id),
              roles:"USER"
            });
        },
    },
    callbacks: {
        // #2 Extending session object with info that we need on client (jwt & session)
        // Order: JWT -> Session
        jwt: async ({ token }) => {
            const user = await db.getUserById(token.sub || '');
            if (!user) return token;
            token.role = user.roles as Roles;
            return token;
        },
        session: async ({ session, token }) => {
            session.user.uuid = token.sub as string;
            return session;
        },
        signIn: () => {
            // Can be customized
            return true;
        },
    },
    // IMPORTANT: we are dividing logic to auth.config to separate using db requests from middleware that runs on Edge runtime
    // P.S. some ORMs use Node.js stuff that the Edge doesn't support
    ...authConfig,
});
