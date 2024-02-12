"use server"

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export async function addTowatchlist(formData: FormData){
    "use server"

    const movieId = formData.get("movieId");
    const pathname = formData.get("pathname") as string;
    
    const data = await prisma.watchList.create({
        data:{
            id: Number(movieId),
        },
    });

    revalidatePath(pathname);
}