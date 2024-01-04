import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';
import { GithubIcon } from 'lucide-react';
import GoogleIcon from "../../../public/google.svg"
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import GitHubSignInButton from '@/app/components/GitHubSignInButton';

export default function Login(){
    return (
        <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
            <form>
                <h1 className="text-3xl font-semibold text-white">Log In</h1>
                <div className="space-y-4 mt-5">
                    <Input type='email' name='email' placeholder='Email' className='bg-[#333] placeholder:text-gray-400 w-full inline-block'/>
                    <Button type="submit" className='w-full bg-[#e50914]'>Log in</Button>
                </div>


                <div className='text-gray-500 text-sm mt-2'>
                    New To MovieInsights ? <Link className='text-white hover:underline' href="/sign-up">SignUp Now!</Link>
                </div>

                <div className="flex w-full justify-center items-center gap-x-3 mt-6">
                    <GitHubSignInButton />
                </div>
            </form>
        </div>
    )
}