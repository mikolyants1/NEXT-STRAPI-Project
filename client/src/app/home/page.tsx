
import PostMapContainer from '@/components/posts/PostMapContainer';
import ExitCard from '@/components/posts/cards/ExitCard';
import { getSessionUser } from '@/lib/getUser/getSessionUser';
import { getStrapiUser } from '@/lib/getUser/getStrapiUser';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata:Metadata = {
  title:"Home",
  description:"Home page"
}

async function page():Promise<JSX.Element> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/");
 const strapiData = await getStrapiUser(sessionUser);

  return (
    <>
      <div className="w-[100%] h-[60px] pt-4 text-xl bg-black text-white text-center relative">
         Small Post App
        <ExitCard />
      </div>
      <PostMapContainer {...strapiData}/>
    </>
  )
}

export default page