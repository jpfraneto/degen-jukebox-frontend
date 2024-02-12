import Image from "next/image";
import { Comic_Neue } from "next/font/google";
import LivePlayer from "../components/LivePlayer";
import Link from "next/link";
import Queue from "../components/Queue";
import QueueCard from "../components/QueueCard";
import { useState } from "react";

const comic = Comic_Neue({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function Home() {
  const [liveRecommendation, setLiveRecommendation] = useState({});
  return (
    <main
      className={`flex overflow-y-scroll fixed top-0 h-screen px-4 pt-8 w-full flex-col items-center ${comic.className}`}
    >
      <h1 className="text-2xl mb-2">the gen radio</h1>
      <QueueCard recommendation={liveRecommendation} />
      <div className="mt-2">
        <LivePlayer setLiveRecommendation={setLiveRecommendation} />
      </div>
      <p>coming next:</p>
      <Queue />
    </main>
  );
}
