import { signIn } from 'next-auth/react';
import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa';

function LoginAnalogCard():JSX.Element {
  const onLoginViaProvider = (provider: 'github' | 'google') => () => {
    signIn(provider, {
      callbackUrl: "/home"
    });
  }

  return (
    <div className='flex justify-center items-center gap-x-10'>
      <button type="button"
       className={'btn flex justify-center'}
       onClick={onLoginViaProvider('github')}>
        <FaGithub className='h-[25px] w-[25px] text-white' />
      </button>
      <button type="button"
       className={'btn flex justify-center'}
       onClick={onLoginViaProvider('google')}>
        <FaGoogle className='h-[25px] w-[25px] text-white' />
      </button>
    </div>
  )
}

export default LoginAnalogCard