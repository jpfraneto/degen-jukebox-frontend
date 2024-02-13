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
      {/* <QueueCard recommendation={liveRecommendation} /> */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-white border mb-4">
        <Image src={liveRecommendation.authorPfp} fill />
      </div>
      <div className="mt-2 w-full">
        <LivePlayer setLiveRecommendation={setLiveRecommendation} />
      </div>
      <Queue />
      <p>
        (to see your pfp here, add a youtube music video to the queue casting
        "@degentip !jukebox X", where X is the amount of $degen that you bid.
        remember to paste the video on the cast also.)
      </p>
    </main>
  );
}
