import { ExtendedUser } from "@/auth";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

export interface IUserAttrs {
    password:string,
    username:string,
    posts:{
      data:IStrapiData<IPostAttrs>[]
    },
    roles:string,
    uuid:string
}

export interface IPostAttrs {
  text:string,
  author:number
}

export interface IContext {
  strapiUser:IStrapiData<IUserAttrs>,
  setMutPosts:Dispatch<SetStateAction<IStrapiData<IPostAttrs>[] | null>>
}
export interface IStrapiData<T> {
    id: number;
    attributes: T;
}

export interface IPostState extends IPostAttrs {
  idx:number
}

export interface IStrapiResponse<T,N> {
    data:N extends [] ? [
      IStrapiData<T>
    ] : IStrapiData<T>
}
export interface IAuthRes {
  success:boolean,
  error:string,
  user:Omit<User,"password"> | null
}

export type Axios<T,N> = AxiosResponse<IStrapiResponse<T,N>>;

export interface IPost extends IPostAttrs {
   id:number
}

export interface IUser extends IUserAttrs {
  id:number
}