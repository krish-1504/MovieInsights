import { AlignCenter } from "lucide-react";
import prisma from "../utils/db";
import { Button } from "@/components/ui/button";
import MovieButtons from "./MovieButtons";
import axios from "axios";



async function getData() {
    const data = await prisma.movie.findFirst({
        where: {
            id: 1930
        },
        select: {
            title: true,
            overview: true,
            release_date: true,
            runtime: true,
            id: true,
            // Add more fields as needed based on your new schema
        }
    });
    
    return data;
}

async function getMediaData(movieID:number){
    // Fetch image URLs from Django backend
    const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieID}`);
    const imgUrls: string[] = imgResponse.data.image_urls;
    const firstImgUrl: string = imgUrls[0];

    // Fetch video URLs from Django backend
    const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieID}`);
    const vidUrls: string[] = vidResponse.data.video_urls;
    const firstVidUrl: string = vidUrls[0];

    console.log(firstImgUrl);
    console.log(firstVidUrl);
    return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };

}


export default async function MovieVideo() {
    const data = await getData();
    const mediaData = await getMediaData(1930);
    return (
        <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
            <video
            poster = {mediaData?.firstImageUrl}
            autoPlay
            muted
            loop
            src={mediaData?.firstVideoUrl}
            className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
            ></video>
            {/* <div>{data?.title}</div>
            <div>{data?.overview}</div> */}
            <div className="absolute w-[90%] lg:w-[40%] mx-auto">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{data?.title}</h1>
                <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
                <div className="flex gap-x-3 mt-4">
                    <MovieButtons duration={data?.runtime as number} id={data?.id as number} overview={data?.overview as string} releaseDate={data?.release_date as Date} title={data?.title as string} youtubeUrl={mediaData?.firstVideoUrl as string} key={data?.id}></MovieButtons>
                </div>
            </div>


            {/* <div className="absolute w-[90%] lg:w-[40%] mx-auto">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{data?.title}</h1>
                <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
                <div className="flex gap-x-3 mt-4">
                    <MovieButtons age={data?. as number} duration={data?.runtime as number} id={data?.id as number} overview={data?.overview as string} releaseDate={data?.release as number} title={data?.title as string} youtubeUrl={data?.youtubeString as string} key={data?.id}></MovieButtons>
                </div>
            </div> */}
        </div>

    )
}