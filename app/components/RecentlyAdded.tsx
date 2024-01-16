
import Image from "next/image";
import prisma from "../utils/db";


async function getData (){

    const data = await prisma.movie.findMany({
        select: {
            id :true,
            overview: true,
            title: true,
            WatchLists: true,
            imageString: true,
            videoSource: true,
        },
        orderBy: {
            createdAt: "desc",

        },
        take: 4,
    })

    return data
}


export default async function RecentlyAdded (){
    const data = await getData()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {
                data.map((movie) => (
                    <div key={movie.id} className="relative h-48">

                        <Image src={movie.imageString} alt="Movie " width={500} height={400} className="rounded-sm absolute w-full h-full object-cover" />
                        <div className="h-60 relative z-10 w-full tranform duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                            <Image src={movie.imageString} alt="Movie" width={800} height={800} className="absolute w-full h-full -z-10 rounded-lg object-cover"></Image>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}