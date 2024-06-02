import { PostActionContext } from "@/lib/context/PostActionContext";
import { IContext } from "@/lib/type"
import { ChangeEvent, useContext, useState } from "react"
import styles from './create.module.css';
import { PostsApi } from "@/api/posts.api";

function CreateCard():JSX.Element {
  const {strapiUser,setMutPosts} = useContext<IContext>(PostActionContext);
  const [text,setText] = useState<string>("");
 
  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setText(e.target.value);
  }

  const createPost = async () => {
    if (!text || !strapiUser) return;
    const new_post = await PostsApi.getClient().createPost(
      strapiUser.id,
      {text,author:strapiUser.id}
    );
    setMutPosts(prv => {
      if (!prv) return null;
      return [...prv,new_post]
    });
  }

  return (
    <div className={styles.container}>
       <div className="flex">
         <input type="text"
          className={styles.input}
          style={{border:"1px solid grey"}}
          onChange={change}
         />
         <button onClick={createPost}
          className={styles.button}>
            create post
         </button>
       </div>
    </div>
  )
}

export default CreateCard