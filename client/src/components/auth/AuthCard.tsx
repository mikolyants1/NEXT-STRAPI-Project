"use client"

import { AuthSchema } from '@/schemas';
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver} from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './form/FormField';
import Link from 'next/link';
import Button from '../ui/Button';
import LoginAnalogCard from './login/LoginAnalogCard';
import { authLogin } from '@/actions/authLogin';
import { authRegister } from '@/actions/authRegister';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface IProps {
  isLogin:boolean
}

function AuthCard({isLogin}:IProps):JSX.Element {
  const [error,setError] = useState<string>("");
  const router:AppRouterInstance = useRouter();
  const form = useForm<z.infer<typeof AuthSchema>>({
    defaultValues:{
      username:"",
      password:""
    },
    resolver:zodResolver(AuthSchema)
  });

  const submit:SubmitHandler<z.infer<
    typeof AuthSchema
  >> = async (values) => {
     if (isLogin){
      await authLogin(values);
     } else {
      const res = await authRegister(values);
      if (res.success_regist){
        router.push("/");
      }
      if (res.error) setError(res.error);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}
       className="m-[100px_auto] overflow-hidden rounded-xl w-[400px] minH-[300px] bg-[rgb(100,100,100)]">
        <FormField
         label='username'
         error={form.formState.errors.username?.message || ""}
        />
        <FormField
         label='password'
         error={form.formState.errors.password?.message || ""}
        />
        <div className='flex justify-center items-center mt-7 mb-4'>
          <Button type='submit' bg='green'>
             {isLogin ? "sign in" : "sign up"}
          </Button>
        </div>
        {isLogin && <LoginAnalogCard />}
        {!!error && (
          <div className={`text-center text-red-400 w-[100%] mt-2 mb-1`}>
             {error}
          </div>
        )}
        <Link href={isLogin ? "/sign-up" : "/"}
         className={`text-white text-center w-[100%] block mt-3`}>
          {isLogin ? "registration" : "Already have an account?"}
        </Link>
      </form>
    </FormProvider>
  )
}

export default AuthCard