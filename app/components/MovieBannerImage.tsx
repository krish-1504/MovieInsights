import Image from "next/image";
import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";

async function getData(movieId: number) {
  const data = await prisma?.movie.findUnique({
    where: {
      id: movieId,
    },
    select: {
      title: true,
      age: true,
      duration: true,
      release: true,
      imageString: true,
      id:true,
      overview:true,
      youtubeString:true,

    },
  });
  return data;
}

export default async function MovieBannerImage({ id }: { id: number }) {
  const data = await getData(Number(id));

  if (!data) {
    // Handle the case when data fetching fails
    return <div>Error loading movie data</div>;
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
            <Image
            src={data?.imageString as string}
            width={1920}
            height={1080}
            alt="movieimg"
            className="w-full h-[75vh] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute bottom-3 left-7 p-6 pb-3 text-white w-full">
                {/* Movie Buttons */}
                  <MovieButtons
                    age={data?.age as number}
                    duration={data?.duration as number}
                    id={data?.id as number}
                    overview={data?.overview as string}
                    releaseDate={data?.release as number}
                    title={data?.title as string}
                    youtubeUrl={data?.youtubeString as string}
                    key={data?.id}
                  />
            </div>
      </div>
      
    </div>
  );
}
