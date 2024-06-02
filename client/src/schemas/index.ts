import * as z from 'zod';

export const AuthSchema = z.object({
    username: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});


