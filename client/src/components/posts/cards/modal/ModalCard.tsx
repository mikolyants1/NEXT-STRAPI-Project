import { PostsApi } from '@/api/posts.api';
import Button from '@/components/ui/Button';
import { PostActionContext } from '@/lib/context/PostActionContext'
import { IContext, IPostAttrs, IStrapiData } from '@/lib/type'
import React, { ChangeEvent, useContext, useState } from 'react'
import styles from './modal.module.css';

interface IProps {
  close:() => void,
  post:IStrapiData<IPostAttrs>
}

function ModalCard({close,post}:IProps):JSX.Element {
 const {setMutPosts} = useContext<IContext>(PostActionContext);
 const [newText,setNewText] = useState<string>("");
 
 const change = (e:ChangeEvent<HTMLInputElement>):void => {
   setNewText(e.target.value);
 }

  const updatePost = async () => {
    const new_post = await PostsApi.getClient().updatePost({
      id:post.id,
      text:newText || post.attributes.text
    });
    console.log(new_post)
    setMutPosts(prv => {
      if (!prv) return null;
      return prv.map(p => p.id == post.id ? new_post : p)
    });
    close();
  }

  return (
    <div className={`fixed w-[100%] top-0 h-[100%] z-100 bg-[rgb(10,10,10,0.5)]`}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <div className="rotate-[45deg] text-white text-3xl"
           onClick={close}>
             +
          </div>
        </div>
        <input onChange={change}
         defaultValue={post.attributes.text}
         className={`input w-[80%] rounded-xl p-2`}
        />
        <Button type="button"
         click={updatePost}
         bg='rgb(41, 250, 128)'>
          update
        </Button>
      </div>
    </div>
  )
}

export default ModalCard