"use server"

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";

export async function addTowatchlist(formData: FormData){
    "use server"

    const movieId = formData.get("movieId");
    console.log("movieis is"+movieId);
    const pathname = formData.get("pathname") as string;
    console.log(pathname);
    
    const data = await prisma.watchList.create({
        data:{
            id: Number(movieId)
        },
    });

    revalidatePath(pathname);
}

export async function deleteFromWatchlist(formData: FormData){
    "use server";
    const movieId = formData.get("movieId");
    const pathname = formData.get("pathname") as string;
    console.log(pathname);

    const data = await prisma.watchList.delete({
        where:{
            id:Number(movieId),
        }
    });

    revalidatePath(pathname);
}