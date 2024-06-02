"use client"

import { IPostAttrs, IStrapiData, IUserAttrs } from '@/lib/type'
import { useState,ReactPortal } from 'react'
import CreateCard from './cards/create/CreateCard';
import { PostActionContext } from '@/lib/context/PostActionContext';
import PostCard from './cards/post/PostCard';
import ModalCard from './cards/modal/ModalCard';

interface IProps {
  strapiUser:IStrapiData<IUserAttrs>,
  posts:IStrapiData<IPostAttrs>[]
}

function PostMapContainer({strapiUser,posts}:IProps):JSX.Element {
  const [post,setPost] = useState<IStrapiData<IPostAttrs>>({} as IStrapiData<IPostAttrs>);
  const [mutPosts,setMutPosts] = useState<IStrapiData<IPostAttrs>[] | null>(posts);
  const [open,setOpen] = useState<boolean>(false);

  const openModal = (p:IStrapiData<IPostAttrs>):void => {
    setPost(p);
    setOpen(true);
  }

  return (
    <PostActionContext.Provider
     value={{strapiUser,setMutPosts}}>
       {open && (
         <ModalCard
          close={() => setOpen(false)}
          post={post}
        />
       )}
      <CreateCard />
      <div className='flex-wrap flex justify-center gap-10 items-center w-[100%] mt-[50px]'>
        {mutPosts && mutPosts.map((p:IStrapiData<IPostAttrs>,i:number):JSX.Element => (
          <PostCard key={i}
           openModal={() => openModal(p)}
           idx={i}
           {...p}
           />
        ))}
      </div>
    </PostActionContext.Provider>
  )
}

export default PostMapContainer