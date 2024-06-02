import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { AuthSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db } from './lib/db';

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async credentials => {
                const parsed = AuthSchema.safeParse(credentials);
                if (!parsed.success) {
                    return null;
                }
                const { username, password } = parsed.data;
                const user = await db.getUserByName(username);
                if (!user || !user.password) {
                    return null;
                }
                const compareResult = await bcrypt.compare(password, user.password);
                if (!compareResult) {
                    return null;
                }
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;