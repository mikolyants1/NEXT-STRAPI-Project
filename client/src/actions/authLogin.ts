"use server"

import { db } from "@/lib/db"
import { TAuthRes } from "@/lib/type"
import { AuthSchema } from "@/schemas"
import { z } from "zod"
import { signIn } from "@/auth"

export const authLogin = async (
  values:z.infer<typeof AuthSchema>
):Promise<TAuthRes<"login">> => {
  const parseValues = AuthSchema.safeParse(values);
  if (!parseValues.success){
    return {
      user:null,
      success_login:false,
      error:"ivalid fields"
    }
  }
  const { password, username } = parseValues.data;
  const user = await db.getUserByName(username);
  if (!user){
    return {
      success_login:false,
      error:"user not found",
      user:null
    }
  }
  const verifyUser = await signIn('credentials', {
    username,
    password,
    redirectTo:'/home',
  });
  if (!verifyUser){
    return { 
      user,
      success_login:false,
      error:"credentials wrong!"
    }
  }
  return {
    user,
    success_login:true,
    error:""
  }
}