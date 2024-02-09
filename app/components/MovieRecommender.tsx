import Image from "next/image";
import prisma from "../utils/db";
import { MovieCard } from "./MovieCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import axios from "axios";

interface iAppProps {
    movieId:string;
}

async function getids(movieId:number) {
        const idResponse = await axios.get(`http://127.0.0.1:8000/api/v1/recommend/${movieId}`);
        const recommendedIds = idResponse.data.details;


        
        return recommendedIds
}

async function getData(movieId:number) {
        const movie = await prisma.movie.findFirst({
            where: {
                id: movieId
            },
            select: {
                id: true,
                title: true,
                overview: true,
                release_date: true,
                runtime: true,
            }
        });

        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found.`);
        }

        const mediaData = await getMediaData(movieId);
        return { ...movie, ...mediaData };
}

async function getMediaData(movieId:number) {
        const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieId}`);
        const imgUrls = imgResponse.data.image_urls;
        const firstImgUrl = imgUrls.length > 0 ? imgUrls[0] : '';

        const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieId}`);
        const vidUrls = vidResponse.data.video_urls;
        const firstVidUrl = vidUrls.length > 0 ? vidUrls[0] : '';

        return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };
}

export default async function MovieRecommender({movieId} : iAppProps) {
    const data = await getids(parseInt(movieId));
    console.log(data);
    return <h1>hiii</h1>
    return (
      <>
      <h1 className="text-3xl font-bold mt-10 ">Recommended Movies Like This :</h1>
      <div className="h-32 w-full bg-black text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
        {
          data.map((movie) => (
              <div key={movie.id} className="relative h-48">

                  <Image src={movie.firstImageUrl} alt="Movie " width={500} height={400} className="rounded-sm absolute w-full h-full object-cover" />
                  <div className="h-60 relative z-10 w-full tranform duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                      <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                          <Image src={movie.firstImageUrl} alt="Movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover"></Image>
                          {/* <MovieCard movieId={movie.id} overview={movie.overview as string} title={movie.title} youtubeUrl={movie.firstVideoUrl} key={movie.id} time={movie.runtime as number} year={movie.release_date as Date}/> */}
                      </div>
                  </div>
              </div>
          ))
        }
        </div>
      </div>
      </>
    );
  }
  