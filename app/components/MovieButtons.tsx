"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import { useState } from "react"
import PlayVideoModal from "./PlayVideoModel";
import prisma from "../utils/db";
import SeedWatchList from "./SeedWatchList";
interface iAppProps {
    overview:string;
    youtubeUrl:string;
    id: number;
    title: string;
    releaseDate: Date;
    duration :number;
    imageUrl:string;
}



export default function MovieButtons({duration,id,title,releaseDate,overview,youtubeUrl,imageUrl}:iAppProps) {
    const [open,setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium mr-5">
                <PlayCircle className="mr-2 h-6 w-6" /> Play 
            </Button>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white mr-5">
                <InfoIcon className="mr-2 h-6 w-6" />Learn More
            </Button>
            
            <PlayVideoModal state={open} changeState={setOpen} duration={duration} key={id} overview={overview} release={releaseDate} title={title} youtubeUrl={youtubeUrl}/>
        </>
    )
}