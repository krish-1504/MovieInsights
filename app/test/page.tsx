import Image from "next/image";
import prisma from "../utils/db";
import axios from "axios"; // Import axios for making HTTP requests

async function getData(movieId: number) {
  const data = await prisma.movie.findMany({
    where: {
      id: movieId,
    }
  });
  return data[0]; // Return the first element of the array
}

export default async function Moviename() {
  const movieId = 19995;
  
  // Fetch data from Prisma and Supabase
  const movieData = await getData(movieId);
  
  // Fetch image URLs from Django backend
  const imgResponse = await axios.get(`http://127.0.0.1:8000/api/v1/img/${movieId}`);
  const imgUrls = imgResponse.data.image_urls;
  
  // Fetch video URLs from Django backend
  const vidResponse = await axios.get(`http://127.0.0.1:8000/api/v1/vid/${movieId}`);
  const vidUrls = vidResponse.data.video_urls;

  // console.log(movieData);
  // console.log(imgUrls);
  // console.log(vidUrls);
  
  return (
    <>
      <div>
        hiii
      </div>
    </>
  );
}
