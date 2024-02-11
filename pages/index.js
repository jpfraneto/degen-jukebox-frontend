import Image from "next/image";
import { Comic_Neue } from "next/font/google";
import LivePlayer from "../components/LivePlayer";
import Link from "next/link";
import Queue from "../components/Queue";
import QueueCard from "../components/QueueCard";
import { useState } from "react";

const comic = Comic_Neue({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function Home() {
  const [thisPfp, setThisPfp] = useState(null);
  return (
    <main
      className={`flex h-screen px-10 pt-8 w-full flex-col items-center ${comic.className}`}
    >
      <h1 className="text-2xl mb-2">the gen radio</h1>
      <QueueCard recommendation={{ authorPfp: thisPfp || "" }} />
      <div className="mb-2">
        <LivePlayer setThisPfp={setThisPfp} />
      </div>
      <p>coming next:</p>
      <Queue />
    </main>
  );
}
