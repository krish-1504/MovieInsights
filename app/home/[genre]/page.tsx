import { MovieCard } from "@/app/components/MovieCard";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import axios from "axios";

async function getMediaData(movieID: number) {
    // Fetch image URLs from Django backend
    const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieID}`);
    const imgUrls: string[] = imgResponse.data.image_urls;
    const firstImgUrl: string = imgUrls.length > 0 ? imgUrls[0] : '';

    // Fetch video URLs from Django backend
    const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieID}`);
    const vidUrls: string[] = vidResponse.data.video_urls;
    const firstVidUrl: string = vidUrls.length > 0 ? vidUrls[0] : '';

    return { firstImageUrl: firstImgUrl, firstVideoUrl: firstVidUrl };
}

async function getData(category : string,userId: string){
    switch(category){
        // case "shows":{
        //     const data = await prisma?.movie.findMany({
        //         where: {
        //             category: 'show'
        //         },
        //         select: {
        //             age:true,
        //             duration: true,
        //             id: true,
        //             title: true,
        //             release: true,
        //             imageString: true,
        //             overview: true,
        //             youtubeString: true,
        //             WatchLists: {
        //                 where: {
        //                     userId:userId
        //                 }
        //             }
        //         }
        //     });
        //     return data;
        // }
        case 'movies':{
            let data = await prisma.movie.findMany({
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    release_date: true,
                    runtime: true,
                },
                take: 1000, 
            });

            console.log(data);
            data = data.sort(() => Math.random() - 0.5);

            // Select the first four items from the shuffled array
            data = data.slice(0, 12);

        
            const movieData = await Promise.all(data.map(async (movie) => {
                const mediaData = await getMediaData(movie.id);
                return { ...movie, ...mediaData };
            }));
        
            return movieData;
        }
        case 'recently':{
            const data = await prisma.movie.findMany({
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    release_date: true, // Assuming 'release_date' corresponds to 'release' in your new schema
                    runtime: true, // Assuming 'runtime' corresponds to 'duration' in your new schema
                    // Add more fields as needed based on your new schema
                },
                where: {
                    release_date: {
                        not: null
                    }
                },
                take: 12,
                orderBy:{
                    release_date:'desc',
                }
            });
            console.log(data);
        
            const movieData = await Promise.all(data.map(async (movie) => {
                const mediaData = await getMediaData(movie.id);
                return { ...movie, ...mediaData };
            }));
        
            return movieData;
        }


        default: {
            throw new Error();
        }
    }
}

export default async function CategoryPage({params}: {params: {genre: string}}){
    const session = await getServerSession(authOptions);
    const data = await getData(params.genre,session?.user?.email as string);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
            {data?.map((movie)=>(
                <div key={movie.id} className="relative h-60">
                    <Image src={movie.firstImageUrl} alt="movie" width={500} height={400} className="rounded-sm absolute w-full h-full object-cover"/>
                    <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                            <Image src={movie.firstImageUrl} alt="movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover"/>

                            <MovieCard key={movie.id} movieId={movie.id} overview={movie.overview as string} time={movie.runtime as number} title={movie.title} year={movie.release_date as Date} youtubeUrl={movie.firstVideoUrl} />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}