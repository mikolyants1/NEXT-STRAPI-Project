import { PostsApi } from '@/api/posts.api';
import { UsersApi } from '@/api/users.api';
import { ExtendedUser } from '@/auth';
import { IPost,IPostAttrs,IStrapiData, IUserAttrs } from '@/lib/type';
import { useEffect, useState } from 'react';

export const useStrapiUser = (sessionUser: ExtendedUser | undefined) => {
    const [strapiUser, setStrapiUser] = useState<IStrapiData<IUserAttrs> | null>(null);
    const [posts,setPosts] = useState<IStrapiData<IPostAttrs>[] | null>(null);
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(() => {
      setLoading(true)
      if (sessionUser) {
       UsersApi.getClient()
       .getUserById(sessionUser.uuid)
       .then((res) => {
        console.log(sessionUser)
         setStrapiUser(res);
         setPosts(res.attributes.posts.data);
       }).finally(() => setLoading(false));
      }
    }, [sessionUser]);
     
    if (loading) return {strapiUser:null,posts:null};
    return {strapiUser,posts};
};
