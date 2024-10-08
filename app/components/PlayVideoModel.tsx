import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "lucide-react";

interface iAppProps {
    title: string;
    overview: string;
    youtubeUrl: string;
    state: boolean;
    changeState: any;
    release: Date;
    duration: number
}


export default function PlayVideoModal({changeState,title,overview,youtubeUrl,state,duration,release} : iAppProps) {
    return (
        <div>
            <Dialog open={state} onOpenChange={() => changeState(!state)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="line-clamp-3">{overview}</DialogDescription>
                        <div className="flex gap-x-2 items-center">
                            <p className="border py-0.5 px-1 border-gray-200 rounded">{release.toLocaleDateString()}</p>
                            {/* <p className="border py-0.5 px-1 border-gray-200 rounded">{age}+</p> */}
                            <p className="border py-0.5 px-1 border-gray-200 rounded">{duration}Min</p>
                        </div>
                    </DialogHeader>
                    <Button onClick={() => window.open(youtubeUrl, '_blank')}>Play Video</Button>
                </DialogContent>
            </Dialog>
        </div>
        
    )
}