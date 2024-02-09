import Image from "next/image";
import { Inter } from "next/font/google";
import LivePlayer from "../components/LivePlayer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-yellow-600 text-7xl">DEGEN JUKEBOX</h1>
      <LivePlayer />
      <div className="flex space-x-2">
        <Link href="/queue">queue</Link>
        <Link href="/queue/add">add music</Link>
      </div>
    </main>
  );
}
