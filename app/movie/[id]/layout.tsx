import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { AuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default async function HomeLayout({children}:{children: ReactNode}) {
    // if(!session){
    //     return redirect("/login")
    // }
    return(
        

        <>
            <Navbar></Navbar>
            <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
                {children}
            </main>
        
        </>
    )
        

}