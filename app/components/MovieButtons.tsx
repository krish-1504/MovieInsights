"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import { useState } from "react"
import PlayVideoModal from "./PlayVideoModel";
import prisma from "../utils/db";
import SeedWatchList from "./SeedWatchList";
import OpenWatchListModel from "./OpenWatchListModel";
import { usePathname } from "next/navigation";
import { addTowatchlist } from "../actions";
interface iAppProps {
    overview:string;
    youtubeUrl:string;
    id: number;
    title: string;
    releaseDate: Date;
    duration :number;
    imageUrl:string;
    inwatchlist:boolean;
}






export default function MovieButtons({duration,id,title,releaseDate,overview,youtubeUrl,imageUrl,inwatchlist}:iAppProps) {
    const pathName = usePathname();
    const [open,setOpen] = useState(false);
    const [listopen,setlistopen] = useState(false);
    
    const [add,setadd] = useState(false);
    const [remove,setremove] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium mr-5">
                <PlayCircle className="mr-2 h-6 w-6" /> Play 
            </Button>
            <Button onClick={() => setOpen(true)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white mr-5">
                <InfoIcon className="mr-2 h-6 w-6" />Learn More
            </Button>
            {!inwatchlist ? (
                            <form action={addTowatchlist}>
                                <input type="hidden" name="movieId" value={Number(id)} />
                                <input type="hidden" name="pathname" value={pathName}/>
                                <Button className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                                    <InfoIcon className="mr-2 h-6 w-6" />Add To Watchlist
                                </Button>
                            </form>
                        ):(<h1>hiii</h1>)}
            {/* <OpenWatchListModel state={listopen} changeState={setlistopen} id={id} inwatchlist={inwatchlist}></OpenWatchListModel> */}
            <PlayVideoModal state={open} changeState={setOpen} duration={duration} key={id} overview={overview} release={releaseDate} title={title} youtubeUrl={youtubeUrl}/>
        </>
    )
}