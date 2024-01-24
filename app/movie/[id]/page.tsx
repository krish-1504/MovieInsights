"use server"
import MovieBannerImage from "@/app/components/MovieBannerImage";
import MovieRecommender from "@/app/components/MovieRecommender";
import prisma from "@/app/utils/db";
import MovieOverview from "@/app/components/MovieOverview";

// Function to fetch movie data
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
      overview: true,
      youtubeString: true,
    },
  });
  return data;
}

// MoviePage component
export default async function MoviePage({ params }: { params: { id: number } }) {
  const { id } = params;
  const data = await getData(Number(id));

  return (
    <div className="bg-gray-900 text-white">
      {/* Movie Banner */}
      <MovieBannerImage id={id} />

      {/* Movie Details */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <div className="text-xl">
            Age: {data?.age} | Duration: {data?.duration} min | Release: {data?.release}
          </div>
        </div>

        
        <MovieOverview overview={data?.overview as string}/>
        <MovieRecommender></MovieRecommender>
      </div>
    </div>
  );
}
