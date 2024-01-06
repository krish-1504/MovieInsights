import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from './utils/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session){
    redirect('/login');
  }else{
    return redirect('/home');
  }
}
