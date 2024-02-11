import Image from "next/image";
import { Comic_Neue } from "next/font/google";
import LivePlayer from "../components/LivePlayer";
import Link from "next/link";
import Queue from "../components/Queue";
import QueueCard from "../components/QueueCard";

const comic = Comic_Neue({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen px-10 pt-8 w-full flex-col items-center ${comic.className}`}
    >
      <h1 className="text-2xl">gen radio</h1>
      <QueueCard
        recommendation={{
          authorPfp:
            "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_gif,w_144/https%3A%2F%2Fi.imgur.com%2FUxAWyZw.gif",
        }}
      />
      <div className="mb-2">
        <LivePlayer />
      </div>
      <Queue />
    </main>
  );
}
