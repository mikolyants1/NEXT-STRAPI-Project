import { UseFormRegisterReturn, useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import { z } from 'zod';
import { AuthSchema } from '@/schemas';

interface IProps {
  label:"username"|"password",
  error:string
}

export function FormField({label,error}:IProps):JSX.Element{
   const {register} = useFormContext<z.infer<typeof AuthSchema>>();

    return (
     <div className={'flex items-center mt-10 mb-5 justify-center w-[100%] relative'}>
        <input
         placeholder={label}
         {...register(label,{required:true})}
         className={`input ${error ? 'border-red-600' : ''} w-[80%] rounded-xl p-2`}
         />
        {!!error && (
          <div className={`text-500-red w-[100%] mt-5 text-center text-red-400 absolute top-5`}>
            {error}
          </div>
        )}
     </div>
    );
};