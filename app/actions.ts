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

export default async function deleteFromWatchlist(formData: FormData){
    "use server";
    const movieId = formData.get("movieId");
    const pathname = formData.get("pathname") as string;

    const data = await prisma.watchList.delete({
        where:{
            id:movieId,
        }
    });

    revalidatePath(pathname);
}