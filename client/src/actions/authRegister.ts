"use server"

import { db } from "@/lib/db"
import { TAuthRes } from "@/lib/type"
import { AuthSchema } from "@/schemas"
import { z } from "zod"
import bc from 'bcryptjs';
import { UsersApi } from "@/api/users.api"
import { signIn } from "@/auth"

export const authRegister = async (
  values:z.infer<typeof AuthSchema>
):Promise<TAuthRes<"regist">> => {
  const parseValues = AuthSchema.safeParse(values);
  if (!parseValues.success){
    return {
      user:null,
      success_regist:false,
      error:"ivalid fields"
    }
  }
  const { password, username } = parseValues.data;
  const user = await db.getUserByName(username);
  const success_regist = !Boolean(user);
  if (success_regist){
    const hash_pass = await bc.hash(password,10);
    const createdUser = await db.createUser({
      password:hash_pass,
      username
    });
    if (!createdUser){
      return {
        error:"create user error",
        user:null,
        success_regist:false
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
    success_regist,
    user:null,
    error: success_regist ? "" : `user with username ${username} already exists`
  }
}