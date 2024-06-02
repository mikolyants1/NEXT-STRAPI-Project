import AuthCard from '@/components/auth/AuthCard'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title:"Registrtion",
  description:"registration page"
}

function page():JSX.Element {
  return (
    <AuthCard isLogin={false} />
  )
}

export default page