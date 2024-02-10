import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import prisma from "../utils/db";

interface iAppProps {
  overview: string;
  youtubeUrl: string;
  id: number;
  title: string;
  releaseDate: Date;
  duration: number;
  imageUrl: string;
}

export default async function SeedWatchList({ duration, id, title, releaseDate, overview, youtubeUrl, imageUrl }: iAppProps) {

  async function handleAddToWatchlist() {
    console.log("hiiii");
    try {
      await prisma.watchList.create({
        data: {
          id: id,
          overview: overview,
          release_date: releaseDate,
          runtime: duration,
          title: title,
          imgUrl: imageUrl,
          vidUrl: youtubeUrl,
        }
      });
      console.log("Added to watchlist successfully.");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  }

  return (

    <>

      <Button onClick={handleAddToWatchlist} className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white">
        <InfoIcon className="mr-2 h-6 w-6" />Add To Watchlist
      </Button>
    </>
  );
}
