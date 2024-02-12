import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import prisma from "../utils/db";
import axios from "axios";
interface iAppProps {
    state: boolean;
    changeState: any;
    id:number;
    inwatchlist:boolean;
}

async function getMediaData(movieId: number) {
    const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieId}`);
    const imgUrls = imgResponse.data.image_urls;
    const firstImgUrl = imgUrls.length > 0 ? imgUrls[0] : '';

    const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieId}`);
    const vidUrls = vidResponse.data.video_urls;
    const firstVidUrl = vidUrls.length > 0 ? vidUrls[0] : '';

    return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };
}

async function addTowatchList(id : number){
    const movie = await prisma.movie.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            id: true,
            title: true,
            overview: true,
            release_date: true,
            runtime: true,
        }
    });
    const mediaData = await getMediaData(id);
    console.log(movie);
    console.log(mediaData);



    await prisma.watchList.create({
        data: {
          id: id,
          overview: movie?.overview,
          release_date: movie?.release_date,
          runtime: movie?.runtime,
          title: movie?.title as string,
          imgUrl: mediaData?.firstImageUrl,
          vidUrl: mediaData?.firstVideoUrl,
        }
      });
}



export default function OpenWatchListModel({state,changeState,id,inwatchlist}:iAppProps){
    return (
        <div>
            <Dialog open={state} onOpenChange={() => changeState(!state)}>
                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        {!inwatchlist && <DialogTitle>Add To WatchList?</DialogTitle> }
                        {inwatchlist && <DialogTitle>Remove From WatchList?</DialogTitle>}

                        {!inwatchlist && <Button onClick={() => addTowatchList(id)} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
                            <InfoIcon className="mr-2 h-6 w-6" />Add To Watchlist
                        </Button>}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}