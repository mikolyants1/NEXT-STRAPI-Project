import { auth } from '@/auth';

export const getSessiontUser = async () => {
   const session = await auth()
   return session?.user;
}