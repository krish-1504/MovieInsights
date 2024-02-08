"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import { useState } from "react"
import PlayVideoModal from "./PlayVideoModel";

interface iAppProps {
    overview:string;
    youtubeUrl:string;
    id: number;
    title: string;
    releaseDate: Date;
    duration :number;
}

export default function MovieButtons({duration,id,title,releaseDate,overview,youtubeUrl}:iAppProps) {
    const [open,setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium mr-5">
                <PlayCircle className="mr-2 h-6 w-6" /> Play 
            </Button>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                <InfoIcon className="mr-2 h-6 w-6" />Learn More
            </Button>

            <PlayVideoModal state={open} changeState={setOpen} duration={duration} key={id} overview={overview} release={releaseDate} title={title} youtubeUrl={youtubeUrl}/>
        </>
    )
}