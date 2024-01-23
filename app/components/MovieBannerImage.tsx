import Image from "next/image";
import prisma from "../utils/db";

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
    },
  });
  return data;
}

export default async function MovieBannerImage({ id }: { id: number }) {
  const data = await getData(id);

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
            className="w-full h-[65vh] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 p-6 pb-3 text-white w-full">
                <h1 className="text-4xl font-extrabold">{data?.title}</h1>
                <p className="text-xl pt-5">{`${data?.duration} min | ${data?.age}+ | Released ${data?.release}`}</p>
            </div>
      </div>
      
    </div>
  );
}
