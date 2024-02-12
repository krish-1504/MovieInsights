import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import prisma from "../utils/db";
import axios from "axios";
import { addTowatchlist, deleteFromWatchlist } from "../actions";
import { usePathname } from "next/navigation";

interface iAppProps {
    state: boolean;
    changeState: any;
    id:number;
    inwatchlist:boolean;
}



export default function OpenWatchListModel({state,changeState,id,inwatchlist}:iAppProps){
    const pathName = usePathname();
    console.log(pathName);
    return (
        <div>
            <Dialog open={state} onOpenChange={() => changeState(!state)}>
                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        {!inwatchlist && <DialogTitle>Add To WatchList?</DialogTitle> }
                        {inwatchlist && <DialogTitle>Remove From WatchList?</DialogTitle>}
                        {inwatchlist && <Button className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                            <InfoIcon className="mr-2 h-6 w-6" />Add To Watchlist
                        </Button>}

                        
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}