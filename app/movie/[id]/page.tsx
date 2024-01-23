import MovieBannerImage from "@/app/components/MovieBannerImage";
import MovieButtons from "@/app/components/MovieButtons";
import prisma from "@/app/utils/db";

async function getData(movieId: number) {
  const data = await prisma?.movie.findUnique({
    where: {
      id: parseInt(movieId),
    },
    select: {
      title: true,
      age: true,
      duration: true,
      release: true,
      imageString: true,
      overview: true,
      youtubeString: true

    },
  });
  return data;
}

export default async function MoviePage({ params }: { params: { id: number } }) {
  const { id } = params;
  const data = await getData(id);

  return (
    <div>
      <MovieBannerImage id={id} />

      <div className="flex gap-x-3 mt-4 ml-8">
        <MovieButtons age={data?.age as number} duration={data?.duration as number} id={data?.id as number} overview={data?.overview as string} releaseDate={data?.release as number} title={data?.title as string} youtubeUrl={data?.youtubeString as string} key={data?.id}></MovieButtons>
      </div>

      <div className="p-8 bg-gradient-to-t from-black via-transparent to-transparent text-white">
        <h2 className="text-3xl font-bold mb-4">Overview</h2>
        <p className="text-gray-300">{data?.overview}</p>
      </div>

    </div>
  );
}
