import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';
import Login from '../login/page';
import { GithubIcon } from 'lucide-react';
import GoogleIcon from "../../../public/google.svg"
import Image from 'next/image';
import GitHubSignInButton from '@/app/components/GitHubSignInButton';

export default function SignUp(){
    
    return (
        <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
            <form action="">
                <h1 className="text-3xl font-semibold text-white">SignUp</h1>
                <div className="space-y-4 mt-5">
                    <Input type='email' name='email' placeholder='Email' className='bg-[#333] placeholder:text-gray-400 w-full inline-block'/>
                    <Button type="submit" className='w-full bg-[#e50914]'>Sign Up</Button>
                </div>


                <div className='text-gray-500 text-sm mt-2'>
                    Already Have An Account? <Link className='text-white hover:underline' href="/login">Log In Now!</Link>
                </div>

                <div className="flex w-full justify-center items-center gap-x-3 mt-6">
                    <Button variant="outline" size="icon">
                        <GitHubSignInButton />
                    </Button>
                </div>
            </form>
        </div>
    )
}