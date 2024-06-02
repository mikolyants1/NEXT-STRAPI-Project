import { PostActionContext } from '@/lib/context/PostActionContext'
import { IContext, IPostAttrs, IStrapiData } from '@/lib/type'
import React, { useContext } from 'react'
import styles from './post.module.css';
import Button from '@/components/ui/Button';
import { PostsApi } from '@/api/posts.api';

interface IProps extends IStrapiData<IPostAttrs> {
  openModal:(p:IStrapiData<IPostAttrs>) => void,
  idx:number
}

function PostCard({idx,id,attributes,openModal}:IProps):JSX.Element {
  const {strapiUser,setMutPosts} = useContext<IContext>(PostActionContext);
  
  const deletePost = async () => {
    await PostsApi.getClient().deletePost(
      strapiUser?.id || 0,
      id
    );
    setMutPosts(prv => {
      if (!prv) return null;
      return prv.filter(p => p.id !== id)
    });
  }

  return (
    <div className={styles.card}
     style={{animationDelay:`${idx * 0.3}s`}}>
      <div className={styles.main}>
         {attributes.text}
      </div>
      <div className={styles.button_container}>
        <Button type="button"
         click={openModal}
         bg='rgb(41, 250, 128)'>
           update
        </Button>
        <Button type="button"
         click={deletePost}
         bg='rgb(255, 83, 83)'>
           delete
        </Button>
      </div>
    </div>
  )
}

export default PostCard