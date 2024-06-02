import { AxiosInstance } from "axios";
import { HttpClient } from "../../utils/HttpClient";
import { Axios, IPost, IPostAttrs, IStrapiData, IStrapiResponse, IUserAttrs } from "@/lib/type";
import { UsersApi } from "./users.api";

export class PostsApi {
   private readonly httpClient:AxiosInstance;
   private static posts:PostsApi | null;

   private constructor(){
    this.httpClient = HttpClient.getClient();
   }

   static getClient(){
     if (!this.posts){
       this.posts = new PostsApi();
     }
     return this.posts;
   }
   
   async createPost(id:number,data:IPostAttrs):Promise<IStrapiData<IPostAttrs>>{
    const post = await this.httpClient
    .post<IStrapiResponse<IPostAttrs,unknown>>("posts",{data});
    const postId = post.data.data.id;
    const user = await this.httpClient.put(`my-users/${id}`,{
      data:{
        posts:{
          connect:[postId]
        }
      }
    });
    return post.data.data;
   }   

   async deletePost(userId:number,postId:number):Promise<IStrapiData<IPostAttrs>>{
     await this.httpClient.put(`my-users/${userId}`,{
       data:{
         posts:{
           disconnect:[postId]
         }
       }
     });
     return this.httpClient.delete(`posts/${postId}`)
     .then(({data}:Axios<IPostAttrs,unknown>) => data.data);
   }

   async updatePost({id,...data}:Omit<IPost,"author">):Promise<IStrapiData<IPostAttrs>>{
     return this.httpClient.put(`posts/${id}`,{data})
     .then(({data}:Axios<IPostAttrs,unknown>) => data.data);
   }
}