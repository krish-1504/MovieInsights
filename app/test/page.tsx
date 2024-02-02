import prisma from "../utils/db"


async function getData(movieId: number) {
    const data = await prisma.movie.findMany({
      where: {
        id: movieId,
      }
    });
    return data;
  }

export default async function Moviename(){
    const data = await getData(559);
    console.log(data);
    return(
        <>
            <div>{data[0].title}</div>
        </>
    )

}