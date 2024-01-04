import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from './utils/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className='m-5'>
      <h1>{session?.user?.name}</h1>
      <Button>Helllow Krish</Button>
    </div>
  )
}
