"use server"

import { db } from "@/lib/db"
import { IAuthRes } from "@/lib/type"
import { AuthSchema } from "@/schemas"
import { z } from "zod"
import bc from 'bcryptjs';
import { UsersApi } from "@/api/users.api"
import { signIn } from "@/auth"

interface IArgs {
   isLogin:boolean,
   values:z.infer<typeof AuthSchema>
}

export const authLogin = async ({
    isLogin,
    values
 }:IArgs):Promise<IAuthRes> => {
    const parseValues = AuthSchema.safeParse(values);
    if (!parseValues.success){
      return {
        user:null,
        success:false,
        error:"ivalid fields"
      }
    }
    const { password, username } = parseValues.data;
    const user = await db.getUserByName(username);
    if (!isLogin){
      const success = !Boolean(user);
      if (success){
        const hash_pass = await bc.hash(password,10);
        const createdUser = await db.createUser({
          password:hash_pass,
          username
        });
        if (!createdUser){
          return {
            error:"create user error",
            user:null,
            success:false
          }
        }
        await UsersApi.getClient().createUser({
          password:hash_pass,
          username,
          posts:{data:[]},
          uuid:createdUser.id,
          roles:"USER"
        });
      }
      return {
        success,
        user:null,
        error: success ? "" : `user with username ${username} already exists`
      }
    }
    if (!user){
        return {
         success:false,
         error:"user not found",
         user:null
        }
    }
    const verifyUser = await signIn('credentials', {
        username,
        password,
        redirectTo:`/home`,
    });
    if (!verifyUser){
    return { 
      user,
      success:false,
      error:"credentials wrong!"
    }
  }
  return {
    user,
    success:true,
    error:""
  }
}