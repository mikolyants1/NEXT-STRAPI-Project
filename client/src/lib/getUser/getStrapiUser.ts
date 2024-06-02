
import { UsersApi } from '@/api/users.api';
import { ExtendedUser } from '@/auth';
import { getSessionUser } from './getSessionUser';

export const getStrapiUser = async (sessionUser: ExtendedUser | undefined) => {
    const prismaUser = await getSessionUser();
    const strapiUser = await UsersApi
    .getClient().getUserById(prismaUser?.uuid || "");
    const posts = strapiUser.attributes.posts.data;
    return {strapiUser,posts}
}
